// Returns the count of completed questionnaire submissions.
// Counts rows in the Smartsheet sheet where the primary column
// (Respondent Name) has a value.
//
// IMPORTANT: This route is fully dynamic with no caching. Earlier versions
// used revalidate = 60 and fetch caching, which compounded and caused the
// count to stick on a stale value. Internal traffic is low, so hitting
// Smartsheet on every request is fine and worth the freshness.

const SMARTSHEET_BASE_URL = "https://api.smartsheet.com/2.0";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const token = process.env.SMARTSHEET_API_TOKEN;
    const sheetId = process.env.SMARTSHEET_SHEET_ID;
    if (!token || !sheetId) {
      return Response.json(
        { count: 0 },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    const res = await fetch(`${SMARTSHEET_BASE_URL}/sheets/${sheetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { count: 0 },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    const data = await res.json();
    const rows = Array.isArray(data.rows) ? data.rows : [];
    const columns = Array.isArray(data.columns) ? data.columns : [];

    // Find the primary column (Respondent Name in this sheet).
    // Filter rows to only those with a non-empty primary cell, so empty
    // test rows are excluded from the count.
    const primary = columns.find((c) => c.primary) || columns[0];
    const primaryColumnId = primary && primary.id;

    let count = 0;
    if (primaryColumnId) {
      for (const row of rows) {
        const cells = Array.isArray(row.cells) ? row.cells : [];
        const cell = cells.find((c) => c.columnId === primaryColumnId);
        if (cell && cell.value && String(cell.value).trim() !== "") {
          count += 1;
        }
      }
    }

    return Response.json(
      { count },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (e) {
    return Response.json(
      { count: 0 },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
