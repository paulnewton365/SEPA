# SEPA Brand Foundation Study

## Two audiences, two builds

This repo produces two sites from one codebase:

- **Internal** — SEPA staff, leadership, board, PUF editorial and commercial.
- **External** — members, partners, regulators, PUF readers, sector observers.

External respondents must never see internal questions. That is enforced at compile time, not in the browser. `scripts/build-questions.mjs` runs before every build and writes exactly one audience's schema to `lib/questions.generated.js`; the app imports only that file. The other audience's questions are never bundled, so they are absent from the JavaScript, the DOM, and view-source. Runtime branching would have left them readable in dev tools, which is why it is not used.

```bash
npm run build:internal   # AUDIENCE=internal
npm run build:external   # AUDIENCE=external
AUDIENCE=internal npm run dev
```

`AUDIENCE` defaults to `external` if unset, so an accidental build fails safe.

**Deploy as two Vercel projects from the same repo**, each with its own `AUDIENCE` environment variable and its own password. Two URLs also let you see which audience a response came from without relying on self-reporting.

To verify the separation after a build:

```bash
grep -rl "renewal-deck" .next/static | wc -l   # 0 on an external build
```

### What each audience gets

The spine is identical in both, word for word, because the highest-value finding in the study is where insiders and outsiders diverge on the same question. That comparison collapses if the wording drifts.

| | Internal | External |
| --- | --- | --- |
| Spine (what SEPA does, what would be lost, differentiator, wish/reality sentence, wince words, name equity, hypothesis, spectrums, word bank) | Yes | Yes |
| Where the name has cost you | Yes | No |
| What you add when explaining the name | No | Yes |
| Neutrality: what it earns | Yes | Yes |
| Neutrality: where the line sits, who decides | Yes | No |
| PUF architecture, authority, two-brand spectrum | Yes | No |
| PUF readership and what not to change | No | Yes |
| Membership module (renewals, what members would notice) | Yes | No |
| Why they joined, what nearly stopped them, where else they turn | No | Yes |
| Research and influence module | Yes | No |
| Walking into rooms | Yes | No |
| What would make them recommend SEPA | No | Yes |

### Disclosure level

The external build states that a rebrand is underway and a change of name is under consideration, with no decision made. It does not reveal brand architecture options, internal governance, or commercial arrangements. If that position changes, the copy to edit is the `nameSection` blurb in `lib/questions/shared.js` and the welcome text in `components/Questionnaire.js`.


A private, password-protected questionnaire built for Antenna Group's SEPA engagement. It widens the input base for Phase 1 Diagnose beyond the individual interviews. Next.js and Tailwind, deploys to Vercel, writes responses to Smartsheet.

## What it does

- Gates access behind a shared phrase (`antennagroup`).
- Walks the respondent through eleven sections that mirror the SEPA Conversation Guide, so written answers and interview transcripts sit under the same headings during synthesis.
- Autosaves to localStorage as they go, then shows a full review page before anything is sent.
- On submit, posts a row to Smartsheet. Every answer lands in its own named column for side-by-side comparison across respondents, plus a full JSON payload in one catch-all cell.

## Relationship to the discussion guide

The interview spine maps to sections 01 through 07. The three interview modules become section 08, where every question is optional, because a written respondent may only have a view on one of them. Sections 09 and 10 add instruments that work better in writing than in conversation: five position spectrums, a word bank, and the twelve-months-from-now questions.

| Guide | App |
| --- | --- |
| Q1 SEPA is a ___ | 01 Open |
| Q2 to Q4 what, why, how | 02 What, why, how |
| Q5 to Q7 clarity and language | 03 Clarity and language |
| Q8 to Q10 the name | 04 The name |
| Q11 to Q12 neutrality | 05 Neutrality |
| Q13 the moment | 06 One specific moment |
| Q14 to Q15 the hypothesis | 07 A line on paper |
| Modules A, B, C | 08 Closer to your work (all optional) |
| Written-only instruments | 09 Where SEPA sits |
| Q16 close | 10 Twelve months from now |
| Follow-up invitation | 11 Final word |

Two questions from the guide are deliberately handled differently in writing. Naming asks for equity and cost but never invites suggestions, same as the interview. The hypothesis question leads with a fixed-choice reaction before the open text, because written respondents tend to be politer than interviewees and the choice forces a position first.

## Local development

```bash
npm install
cp .env.example .env.local
# Fill in SMARTSHEET_API_TOKEN and SMARTSHEET_SHEET_ID
npm run dev
```

Runs at `http://localhost:3000`.

## Live deployment details

The target Smartsheet is created and configured. No Smartsheet setup work remains.

- **Sheet name:** SEPA Brand Foundation Study - Responses
- **Sheet ID:** `1823074616823684`
- **Workspace:** CLIENT SURVEYS
- **Direct link:** https://app.smartsheet.com/sheets/j5rhVxW4jmQWcgFH4vH8q8rJQVpg7hH56cXQF7J1

All columns are in place with the exact names this code expects: 4 metadata, 40 answer columns, and 1 catch-all JSON column. Respondent Name is the primary column, which is what the welcome-screen response counter reads. Identifying is optional for respondents, so when the name field is left blank the API writes "Anonymous" into that column rather than an empty cell, which keeps the counter accurate. The section below is kept for reference, or for building a second sheet.

## Smartsheet setup

Create a sheet before deploying. The integration looks columns up by name, so names must match exactly. Column order is flexible and text works for every column. Any column that doesn't exist is skipped silently, so a partial sheet still captures the JSON payload.

### Metadata columns

| Column name | Notes |
| --- | --- |
| Submitted At | ISO 8601 timestamp |
| Respondent Name | Set this as the sheet's primary column, the response counter uses it |
| Respondent Role | |
| Respondent Organization | |
| Full Responses (JSON) | Full payload as a JSON string |

### Answer columns

Vantage point · SEPA is a · What SEPA does · What would be lost · What SEPA does differently · Wish sentence · Reality sentence · What audiences should understand · Words that make them wince · What they say instead · What the name has earned · What the name has cost · One thing that survives a rename · Keep name to New name · What neutrality earns · Leading versus neutrality · Neutral convener to Leading voice · The moment · Hypothesis first reaction · Where the hypothesis fails · Least convinced audience · Their objection · PUF described · PUF authority and risk · Two brands to One brand · What keeps a member · What would feel like being dropped · What would feel like inclusion · Research that changed a decision · The one argument · Serving members to Shaping sector · Reporting to Driving · Membership org to Institution · Following to Setting agenda · Words for SEPA today · Three words future · Member meeting feeling · Regulator meeting feeling · Journalist meeting feeling · What didn't we ask

That is 40 answer columns plus 5 metadata columns, 45 in total. The exact mapping lives in `HEADLINE_FIELDS` in `lib/smartsheet.js`.

### Getting the token and sheet id

1. In Smartsheet, click your avatar, then Personal Settings, then API Access.
2. Generate an access token. Save it as `SMARTSHEET_API_TOKEN`.
3. Open the sheet, click File, then Properties. Copy the sheet id. Save it as `SMARTSHEET_SHEET_ID`.

## Vercel deployment

1. Push to GitHub, or upload directly to Vercel.
2. Create a Vercel project pointing at the repo.
3. Under Environment Variables set `SMARTSHEET_API_TOKEN` and `SMARTSHEET_SHEET_ID`.
4. Deploy. Default settings work, no extra build configuration needed.

## Passwords

Each audience has its own:

| Build | Password |
| --- | --- |
| internal | `antennagroup` |
| external | `externalview` |

They are resolved in `scripts/build-questions.mjs` at build time and written into the generated file, so each bundle contains only its own. A lookup map inside the app would have compiled both into both bundles, putting the internal password in the external site's source. Verify after a build with `grep -ro '"antennagroup"' .next/static | wc -l`, which should return 0 on an external build. Note that `antennagroup` also appears as a domain in the footer link and contact email, so grep for the quoted string rather than the bare word.

To rotate without a code change, set `INTERNAL_PASSWORD` or `EXTERNAL_PASSWORD` in that project's Vercel environment variables and redeploy without the build cache.

The session key is namespaced per audience, so unlocking one deployment in a browser does not unlock the other.

This is still a soft gate, not a security boundary. The password reaches the browser and anyone who reads the source of that site can find it. It keeps casual visitors out. For anything stronger, use Vercel Deployment Protection.

## Editing questions

All content lives in `lib/questions.js`. Prompts, helper copy, input types, word limits, word banks, select options, and spectrum labels. Edit and redeploy.

If you add a question that should have its own Smartsheet column, add the field id to `HEADLINE_FIELDS` in `lib/smartsheet.js` and create the matching column. If you skip that step the answer still arrives in the JSON payload.

## Analysis notes

The instruments in here were chosen to make divergence visible rather than to produce averages.

- **The spectrums** in sections 04, 05, 08 and 09 are the fastest read. Plot each respondent as a point per spectrum. Where leadership and staff cluster apart, or where PUF sits opposite SEPA on the two-brands question, that gap is the finding.
- **The wish and reality sentences** in section 03 should be read as pairs, not separately. The distance between them is the brief.
- **The wince words and substitutions** in Q7 build the vocabulary list for Craft directly. Substitutions go in the do column, wince words in the don't.
- **The hypothesis reaction** in section 07 is a fixed choice followed by open text. Read the text of everyone who chose anything other than "That's it" first.
- **Vantage point** in section 01 is the segmentation variable for all of the above.

## Data handling

- Drafts save to the respondent's localStorage on every keystroke, debounced 600ms. On submit the draft is cleared and a flag is set in sessionStorage.
- Respondents can leave and return. "Save and finish later" flushes the draft immediately and shows a confirmation screen; on their next visit the welcome screen recognises the draft, reports how far through they are, and changes the button to Continue.
- This resume is per browser and per device, because the draft lives in localStorage. Someone who starts on a laptop cannot finish on a phone. True cross-device resume would need server-side storage keyed to a token, which is a bigger change than it sounds and is not built.
- Identifying is optional. Name, role and organization can all be left blank. Vantage point in section 01 is the required segmentation variable, so an anonymous response is still analytically useful.
- That flag means someone who submits and then refreshes sees the thank-you page until they clear sessionStorage or open a new browser session.
- There is no admin view. Review responses in Smartsheet.

## File map

```
app/
  layout.js            Root layout, font loading
  page.js              Mounts PasswordGate + Questionnaire
  globals.css          Base styles, paper grain, slider styling, animations
  api/submit/route.js  POST endpoint that calls submitToSmartsheet
  api/count/route.js   Live response count for the welcome screen

components/
  PasswordGate.js      Shared-phrase gate
  Header.js            Sticky header with logo, progress bar, save indicator
  ProgressRail.js      Left-rail section navigator
  Questionnaire.js     Welcome, main form, autosave, submit, thank you
  ReviewPage.js        Read-back page before submission
  QuestionBlock.js     Type dispatcher
  inputs/
    TextField.js  TextArea.js  Slider.js  Spectrum.js
    SingleSelect.js  MultiSelect.js  WordBank.js  WordCount.js

lib/
  questions.js         Question schema, all content lives here
  smartsheet.js        Smartsheet API helper and column mapping
```
