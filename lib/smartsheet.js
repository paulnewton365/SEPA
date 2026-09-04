import { AUDIENCE } from "./questions.js";
// Smartsheet API helper.
//
// Strategy:
// 1. Fetch sheet column metadata (cached in module memory while the
//    serverless instance stays warm).
// 2. Build a map of column name -> column id.
// 3. For each headline field id we care about, look up its target
//    column by name and stage a cell.
// 4. Stage three metadata cells (Submitted At, Respondent Name, Role,
//    Organisation), and one big JSON cell with the full payload.
// 5. POST a row to /sheets/{sheetId}/rows.
//
// If a column from the headline list isn't present in the sheet, we
// skip it gracefully. The full JSON payload is the source of truth.

const API_BASE = "https://api.smartsheet.com/2.0";

// Headline columns mapped from field id -> Smartsheet column name.
// These columns are created in the target Smartsheet to enable
// at-a-glance divergence analysis without parsing JSON.
const HEADLINE_FIELDS = {
  vantage: "Vantage point",
  q1_a: "SEPA is a",
  q2_a: "What SEPA does",
  q3_a: "What would be lost",
  q4_a: "What SEPA does differently",
  q5_a: "Wish sentence",
  q5_b: "Reality sentence",
  q6_a: "What gets missed about SEPA",
  q7_a: "Words that make them wince",
  q7_b: "What they say instead",
  q8_a: "What the name has earned",
  q9_a: "What the name has cost",
  q9x_a: "What they add when explaining",
  q9x_b: "How often the name needs explaining",
  q10_a: "One thing that survives a rename",
  q10_b: "Keep name to New name",
  q11_a: "What neutrality earns",
  q12_a: "Leading versus neutrality",
  q12_b: "Neutral convener to Leading voice",
  q13_a: "The moment",
  q14_a: "Hypothesis first reaction",
  q14_b: "Where the hypothesis fails",
  q15_a: "Least convinced audience",
  q15_b: "Their objection",
  q_puf_a: "PUF described",
  q_puf_b: "PUF authority and risk",
  q_puf_c: "Two brands to One brand",
  q_mem_a: "What keeps a member",
  q_mem_b: "What would feel like being dropped",
  q_mem_c: "What would feel like inclusion",
  q_inf_a: "Research that changed a decision",
  q_inf_b: "The one argument",
  q_join_a: "What they hoped to get",
  q_join_b: "What keeps them involved",
  q_join_c: "What nearly put them off",
  q_alt_a: "Where else they turn",
  q_alt_b: "What others give that SEPA doesn't",
  q_pufx_a: "PUF relationship",
  q_pufx_b: "What PUF is good for",
  q18x_a: "What would most improve their view",
  q18x_b: "What would make them recommend SEPA",
  q16_a: "Serving members to Shaping sector",
  q16_b: "Reporting to Driving",
  q16_c: "Membership org to Institution",
  q16_e: "Following to Setting agenda",
  q17_a: "Words for SEPA today",
  q17_b: "Three words future",
  q18_a: "Member meeting feeling",
  q18_b: "Regulator meeting feeling",
  q18_c: "Journalist meeting feeling",
  q_final_a: "What didn't we ask",
};

const METADATA_COLUMNS = {
  submittedAt: "Submitted At",
  audience: "Audience",
  respondentName: "Respondent Name",
  respondentRole: "Respondent Role",
  respondentOrg: "Respondent Organization",
  jsonPayload: "Full Responses (JSON)",
};

let columnsCache = null;

async function fetchColumns(sheetId, token) {
  if (columnsCache) return columnsCache;
  const res = await fetch(
    `${API_BASE}/sheets/${sheetId}/columns?includeAll=true`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Smartsheet columns fetch failed: ${res.status} ${text}`);
  }
  const body = await res.json();
  const map = {};
  for (const col of body.data || []) {
    map[col.title] = col.id;
  }
  columnsCache = map;
  return map;
}

function stringify(value) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export async function submitToSmartsheet({ answers, submittedAt }) {
  const token = process.env.SMARTSHEET_API_TOKEN;
  const sheetId = process.env.SMARTSHEET_SHEET_ID;
  if (!token || !sheetId) {
    throw new Error(
      "Server is not configured. Missing SMARTSHEET_API_TOKEN or SMARTSHEET_SHEET_ID."
    );
  }

  const columns = await fetchColumns(sheetId, token);

  const cells = [];

  // Metadata
  if (columns[METADATA_COLUMNS.submittedAt]) {
    cells.push({
      columnId: columns[METADATA_COLUMNS.submittedAt],
      value: submittedAt,
    });
  }
  // Which build this response came from. Internal and external rows land
  // in the same sheet, and the comparison between them is the point, so
  // every row has to be attributable to an audience.
  if (columns[METADATA_COLUMNS.audience]) {
    cells.push({
      columnId: columns[METADATA_COLUMNS.audience],
      value: AUDIENCE === "internal" ? "Internal" : "External",
    });
  }

  if (columns[METADATA_COLUMNS.respondentName]) {
    // Identifying is optional. The primary column still needs a value,
    // both so the row reads sensibly and because the welcome-screen
    // response counter counts non-empty primary cells.
    const name = stringify(answers.respondent_name).trim();
    cells.push({
      columnId: columns[METADATA_COLUMNS.respondentName],
      value: name || "Anonymous",
    });
  }
  if (columns[METADATA_COLUMNS.respondentRole]) {
    cells.push({
      columnId: columns[METADATA_COLUMNS.respondentRole],
      value: stringify(answers.respondent_role),
    });
  }
  if (columns[METADATA_COLUMNS.respondentOrg]) {
    cells.push({
      columnId: columns[METADATA_COLUMNS.respondentOrg],
      value: stringify(answers.respondent_org),
    });
  }

  // Headline fields
  for (const [fieldId, colName] of Object.entries(HEADLINE_FIELDS)) {
    const colId = columns[colName];
    if (!colId) continue;
    cells.push({
      columnId: colId,
      value: stringify(answers[fieldId]),
    });
  }

  // Full JSON payload
  if (columns[METADATA_COLUMNS.jsonPayload]) {
    cells.push({
      columnId: columns[METADATA_COLUMNS.jsonPayload],
      value: JSON.stringify({ submittedAt, answers }),
    });
  }

  if (cells.length === 0) {
    throw new Error(
      "No matching columns found in the target Smartsheet. Check column names against the README."
    );
  }

  const res = await fetch(`${API_BASE}/sheets/${sheetId}/rows`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toBottom: true,
      cells,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Smartsheet row POST failed: ${res.status} ${text}`);
  }

  return await res.json();
}

// Exported so the README generator can use the same list.
export { HEADLINE_FIELDS, METADATA_COLUMNS };
