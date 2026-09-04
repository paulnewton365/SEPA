// Questions asked of BOTH audiences, in identical wording.
//
// The wording being identical is the point. The most valuable finding in
// this study is where people inside SEPA and people outside it diverge on
// the same question. That comparison only holds if nobody was asked a
// subtly different version, so resist the urge to tune these per audience.
//
// Anything that assumes the respondent works at SEPA belongs in
// internal.js, not here.

export const openSection = (audience) => ({
  id: "s1",
  number: "01",
  title: "Open",
  blurb:
    "Two quick ones to start. Don't deliberate. The first words that arrive are the useful ones.",
  questions: [
    {
      id: "q_vantage",
      prompt: "Where do you sit?",
      helper:
        "This tells us which lens your answers are coming through. Nothing more.",
      blocks: [
        {
          id: "vantage",
          type: "single_select",
          label: "Closest description of your vantage point",
          options:
            audience === "internal"
              ? [
                  "SEPA leadership",
                  "SEPA core project team",
                  "SEPA staff",
                  "Board",
                  "PUF editorial",
                  "PUF commercial",
                ]
              : [
                  "SEPA member, utility",
                  "SEPA member, solution provider",
                  "SEPA member, other",
                  "Partner organization",
                  "Regulator or policymaker",
                  "Large energy user",
                  "PUF reader or contributor",
                  "Sector observer",
                ],
        },
      ],
    },
    {
      id: "q1",
      prompt: "Finish this sentence: SEPA is a _____ .",
      helper: "One short phrase. Whatever comes to mind first.",
      blocks: [
        {
          id: "q1_a",
          type: "text",
          label: "SEPA is a...",
          placeholder: "One short phrase.",
          minWords: 1,
          maxWords: 14,
        },
      ],
    },
  ],
});

export const whatWhyHowSection = {
  id: "s2",
  number: "02",
  title: "What, why, how",
  blurb:
    "What SEPA does, what would be lost without it, and what it does differently. Plain language throughout. If a sentence needs a second sentence to explain it, it isn't the answer yet.",
  questions: [
    {
      id: "q_what",
      prompt: "What does SEPA actually do?",
      helper:
        "Describe it to someone in the sector who has never come across SEPA. No acronyms.",
      blocks: [
        {
          id: "q2_a",
          type: "text",
          label: "In one sentence, what does SEPA do for the people it serves?",
          placeholder: "Skip the mission statement version.",
          maxWords: 30,
        },
      ],
    },
    {
      id: "q3",
      prompt: "If SEPA vanished overnight, what would be lost?",
      helper:
        "Not just for members. For the sector, for the grid, for the pace of the transition. Assume another organization picks up some of it. What still wouldn't happen?",
      blocks: [
        {
          id: "q3_a",
          type: "textarea",
          label: "What would be lost.",
          placeholder: "Short is fine. Specific is better.",
          minWords: 15,
          maxWords: 120,
        },
      ],
    },
    {
      id: "q4",
      prompt:
        "Other organizations work on the same problems. What does SEPA do differently?",
      helper: "The approach, not the output. An example beats an adjective.",
      blocks: [
        {
          id: "q4_a",
          type: "text",
          label: "The difference, in one sentence:",
          placeholder: "One short sentence on the approach.",
          maxWords: 40,
        },
      ],
    },
  ],
};

export const claritySection = {
  id: "s3",
  number: "03",
  title: "Clarity and language",
  blurb:
    "This section is about the gap between what people want said about SEPA and what actually gets said.",
  questions: [
    {
      id: "q5",
      prompt: "The one sentence.",
      helper:
        "Two versions. The one you'd want people using, and the one you think they actually use.",
      blocks: [
        {
          id: "q5_a",
          type: "text",
          label:
            "If someone explained SEPA to a peer in one sentence, what would you want them to say?",
          placeholder: "One sentence, in plain language.",
          maxWords: 30,
        },
        {
          id: "q5_b",
          type: "text",
          label: "And what do you think most people in the sector actually say?",
          placeholder: "Be honest. This is the more useful of the two.",
          maxWords: 30,
        },
      ],
    },
    {
      id: "q6",
      prompt:
        "When this website and branding work is done, what do you want audiences to better understand?",
      helper: "Something they don't get today.",
      blocks: [
        {
          id: "q6_a",
          type: "text",
          label: "What you want them to understand:",
          placeholder: "One sentence.",
          maxWords: 30,
        },
      ],
    },
    {
      id: "q7",
      prompt: "The words that put people off.",
      helper:
        "Every sector has vocabulary that closes people down rather than opening them up. What you say instead is the more valuable half of this answer.",
      blocks: [
        {
          id: "q7_a",
          type: "text",
          label: "Words or phrases this sector uses that make you wince:",
          placeholder: "Two or three. Separate with commas.",
          maxWords: 25,
        },
        {
          id: "q7_b",
          type: "text",
          label: "What you find yourself saying instead:",
          placeholder: "Your substitutions, in your words.",
          maxWords: 30,
        },
      ],
    },
  ],
};

// Naming. The framing differs by audience but the two questions are
// identical, because comparing insider and outsider views on the name is
// one of the decisions this study exists to inform.
export const nameSection = (audience) => ({
  id: "s4",
  number: "04",
  title: "The name",
  blurb:
    audience === "internal"
      ? "The 2015 rename is still being explained. The acronym runs into trouble globally and \u201cSmart Electric\u201d narrows what SEPA actually does. But eleven years is eleven years of equity too. We're not asking for name suggestions here."
      : "As part of this work, a change of name is under consideration. No decision has been made. We want to understand what the current name is worth before anyone weighs that up. We're not asking for name suggestions here.",
  questions: [
    {
      id: "q8",
      prompt:
        "What has the SEPA name earned that would genuinely hurt to give up?",
      helper: "Be specific. Whose recognition, where, and at what moment.",
      blocks: [
        {
          id: "q8_a",
          type: "text",
          label: "What the name has earned:",
          placeholder: "Name the room and the person if you can.",
          maxWords: 40,
        },
      ],
    },
    {
      id: "q10",
      prompt:
        "If the name changed and one thing had to survive untouched, what would it be?",
      helper: "One thing. Not a list.",
      blocks: [
        {
          id: "q10_a",
          type: "text",
          label: "The one thing that survives:",
          placeholder: "Twenty words or fewer.",
          maxWords: 20,
        },
        {
          id: "q10_b",
          type: "spectrum",
          leftLabel: "Keep the name, change everything else",
          rightLabel: "A new name is the right move",
          min: 0,
          max: 100,
          default: 50,
        },
      ],
    },
  ],
});

// Only the positive-case neutrality question is shared. "Who decides where
// the line sits" is internal governance and lives in internal.js.
export const neutralityQuestion = {
  id: "q11",
  prompt: "Where does staying neutral get SEPA something nobody else can get?",
  helper:
    "SEPA does not lobby. The access, the conversation, the room. Something a partisan organization could not have.",
  blocks: [
    {
      id: "q11_a",
      type: "text",
      label: "What neutrality earns:",
      placeholder: "One or two sentences.",
      maxWords: 40,
    },
  ],
};

export const momentSection = {
  id: "s6",
  number: "06",
  title: "One specific moment",
  blurb:
    "This question tends to produce more usable language than any other one here, because people narrate in their own voice.",
  questions: [
    {
      id: "q13",
      prompt: "Tell us about a moment that changed how you thought about SEPA.",
      helper:
        "Not a milestone. A moment. What happened, and what did you do differently afterwards?",
      blocks: [
        {
          id: "q13_a",
          type: "textarea",
          label: "Describe the moment.",
          placeholder: "Where you were. What was said. What stuck with you.",
          minWords: 30,
          maxWords: 180,
        },
      ],
    },
  ],
};

export const hypothesisSection = (audience) => ({
  id: "s7",
  number: "07",
  title: "A line to test",
  blurb:
    audience === "internal"
      ? "One idea from our early thinking, put in front of you to test rather than to approve. Tell us where it holds and where it needs work. Both halves are useful."
      : "One idea from our early thinking. It is a working line, not a decision. Tell us where it holds and where it needs work.",
  questions: [
    {
      id: "q14",
      prompt: "\u201cLet's shape energy's transition.\u201d",
      helper:
        "Read it once, react, then explain the reaction. First instinct is the useful one.",
      blocks: [
        {
          id: "q14_a",
          type: "single_select",
          label: "First reaction:",
          options: [
            "That's it",
            "Close, but not quite",
            "Right idea, wrong words",
            "Doesn't sound like SEPA",
            "Actively wrong",
            "Can't tell yet",
          ],
        },
        {
          id: "q14_b",
          type: "text",
          label: "What works about it, and what needs work?",
          placeholder: "The word that lands, or the word that catches.",
          maxWords: 40,
        },
      ],
    },
    {
      id: "q15",
      prompt: "Which audience would be least convinced by it?",
      helper: "And what would their objection be?",
      blocks: [
        {
          id: "q15_a",
          type: "single_select",
          label: "Least convinced:",
          options: [
            "Utility leaders",
            "Regulators and policymakers",
            "Clean energy solution providers",
            "Large energy users",
            "SEPA's own staff",
            "None of them, it works",
          ],
        },
        {
          id: "q15_b",
          type: "text",
          label: "Their objection, in their words:",
          placeholder: "What they'd actually say.",
          maxWords: 30,
        },
      ],
    },
  ],
});

export const positionSection = {
  id: "s9",
  number: "09",
  title: "Where SEPA sits",
  blurb:
    "Drag each slider to where you think SEPA sits today, not where you'd like it to sit. Placing them fast is better than placing them carefully. Nothing is recorded until you move a slider.",
  questions: [
    {
      id: "q16",
      prompt: "Drag each slider to where SEPA sits today.",
      helper: "Where it is now. The gap between people is the finding.",
      blocks: [
        {
          id: "q16_a",
          type: "spectrum",
          leftLabel: "Serving its members",
          rightLabel: "Shaping the sector",
          min: 0,
          max: 100,
          default: 50,
        },
        {
          id: "q16_b",
          type: "spectrum",
          leftLabel: "Reporting on the transition",
          rightLabel: "Driving the transition",
          min: 0,
          max: 100,
          default: 50,
        },
        {
          id: "q16_c",
          type: "spectrum",
          leftLabel: "A membership organization",
          rightLabel: "An institution the sector relies on",
          min: 0,
          max: 100,
          default: 50,
        },
        {
          id: "q16_e",
          type: "spectrum",
          leftLabel: "Following the sector's agenda",
          rightLabel: "Setting the sector's agenda",
          min: 0,
          max: 100,
          default: 50,
        },
      ],
    },
    {
      id: "q17",
      prompt: "Words for SEPA.",
      helper: "Top of mind. No deliberation.",
      blocks: [
        {
          id: "q17_a",
          type: "word_bank",
          label: "Pick up to five words that describe SEPA as it is today.",
          max_selected: 5,
          options: [
            "trusted",
            "neutral",
            "rigorous",
            "convening",
            "cautious",
            "worthy",
            "invisible",
            "technical",
            "collegial",
            "slow",
            "credible",
            "narrow",
            "generous",
            "overlooked",
            "practical",
            "establishment",
            "quiet",
            "necessary",
            "fragmented",
            "steady",
          ],
        },
        {
          id: "q17_b",
          type: "text",
          label: "Three words that should describe SEPA three years from now:",
          placeholder: "Word 1, word 2, word 3.",
          maxWords: 12,
        },
      ],
    },
  ],
};

export const respondentQuestion = {
  id: "respondent",
  prompt: "Before you submit.",
  helper:
    "Identifying yourself is optional. It lets us follow up on something you said, but an anonymous response is just as welcome.",
  blocks: [
    {
      id: "respondent_name",
      type: "text",
      label: "Your name",
      placeholder: "Leave blank to stay anonymous.",
      maxWords: 10,
      optional: true,
    },
    {
      id: "respondent_role",
      type: "text",
      label: "Your role",
      placeholder: "Title or function.",
      maxWords: 15,
      optional: true,
    },
    {
      id: "respondent_org",
      type: "text",
      label: "Your organization",
      placeholder: "Optional.",
      maxWords: 10,
      optional: true,
    },
  ],
};

export const finalSection = {
  id: "s11",
  number: "11",
  title: "Final word",
  blurb:
    "One open invitation. Optional. The most useful thing you say in this whole questionnaire may go here.",
  questions: [
    {
      id: "q_final",
      prompt: "The question we should have asked.",
      helper: "Take a beat. Then write what comes.",
      blocks: [
        {
          id: "q_final_a",
          type: "textarea",
          label: "What didn't we ask that you wish we had?",
          placeholder: "Anything that's been on your mind.",
          minWords: 10,
          maxWords: 200,
          optional: true,
        },
      ],
    },
  ],
};
