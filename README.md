# SEPA Brand Foundation Study

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

All 49 columns are in place with the exact names this code expects: 5 metadata, 43 answer columns, and 1 catch-all JSON column. Respondent Name is the primary column, which is what the welcome-screen response counter reads. The section below is kept for reference, or for building a second sheet.

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

Vantage point · SEPA is a · What SEPA does · Said differently to a regulator · What would be lost · What SEPA does differently · Wish sentence · Reality sentence · What outsiders finally understand · Words that make them wince · What they say instead · What the name has earned · What the name has cost · One thing that survives a rename · Keep name to New name · What neutrality earns · Leading versus neutrality · Neutral convener to Leading voice · The moment · Memorable detail · Hypothesis first reaction · Where the hypothesis fails · Least convinced audience · Their objection · PUF described · PUF authority and risk · Two brands to One brand · What keeps a member · What would feel like being dropped · What would feel like inclusion · Research that changed a decision · The one argument · Serving members to Shaping sector · Reporting to Driving · Membership org to Institution · Understood to Not understood · Following to Setting agenda · Words for SEPA today · Three words future · Member meeting feeling · Regulator meeting feeling · Journalist meeting feeling · What is different · What didn't we ask

That is 44 answer columns plus 5 metadata columns, 49 in total. The exact mapping lives in `HEADLINE_FIELDS` in `lib/smartsheet.js`.

### Getting the token and sheet id

1. In Smartsheet, click your avatar, then Personal Settings, then API Access.
2. Generate an access token. Save it as `SMARTSHEET_API_TOKEN`.
3. Open the sheet, click File, then Properties. Copy the sheet id. Save it as `SMARTSHEET_SHEET_ID`.

## Vercel deployment

1. Push to GitHub, or upload directly to Vercel.
2. Create a Vercel project pointing at the repo.
3. Under Environment Variables set `SMARTSHEET_API_TOKEN` and `SMARTSHEET_SHEET_ID`.
4. Deploy. Default settings work, no extra build configuration needed.

## Changing the password

The shared phrase lives in `components/PasswordGate.js`, in the `PASSWORD` constant. Change it and redeploy.

This is a soft gate, not a security boundary. The password sits in client-side code and anyone who reads the source can find it. It keeps casual visitors out. Don't put anything genuinely confidential behind it.

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
