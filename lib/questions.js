// Single source of truth for the questionnaire structure.
// Each section has an id, title, blurb, and an array of question blocks.
// Each block has an id, type, label, helper copy, and constraints.
//
// This schema mirrors the SEPA Conversation Guide (Brand Foundation,
// Phase 1 Diagnose). The interview spine is reproduced in sections 01
// through 07 so written responses sit alongside interview transcripts
// under the same headings. Section 08 carries the interview modules as
// optional questions, since a written respondent may only have a view
// on one of them.
//
// Target completion time: around 12 minutes.
//
// Smartsheet column names mirror these ids via lib/smartsheet.js.

export const sections = [
  {
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
            options: [
              "SEPA leadership",
              "SEPA core project team",
              "SEPA staff",
              "SEPA member",
              "PUF editorial",
              "PUF commercial",
              "Board",
              "Partner or advisor",
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
  },
  {
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
            label:
              "In one sentence, what does SEPA do for the people it serves?",
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
  },
  {
    id: "s3",
    number: "03",
    title: "Clarity and language",
    blurb:
      "Eleven years on from the last name change, people still can't easily say what SEPA is or why it matters. This section is about the gap between what you want said and what actually gets said.",
    questions: [
      {
        id: "q5",
        prompt: "The one sentence a member would use.",
        helper:
          "Two versions. The one you'd want, and the one you think they actually give.",
        blocks: [
          {
            id: "q5_a",
            type: "text",
            label:
              "What you'd want a member to say when they explain SEPA to a peer:",
            placeholder: "One sentence, in their voice not yours.",
            maxWords: 30,
          },
          {
            id: "q5_b",
            type: "text",
            label: "What you think they actually say today:",
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
  },
  {
    id: "s4",
    number: "04",
    title: "The name",
    blurb:
      "The 2015 rename is still being explained. The acronym runs into trouble globally and \u201cSmart Electric\u201d narrows what SEPA actually does. But eleven years is eleven years of equity too. We're not asking for name suggestions here.",
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
        id: "q9",
        prompt: "Where has the SEPA name got in the way?",
        helper:
          "A meeting that opened with an explanation. Someone who assumed the wrong thing. A door that didn't open.",
        blocks: [
          {
            id: "q9_a",
            type: "textarea",
            label: "Where the name has cost something:",
            placeholder: "A moment rather than a general observation.",
            minWords: 10,
            maxWords: 120,
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
  },
  {
    id: "s5",
    number: "05",
    title: "Neutrality",
    blurb:
      "SEPA does not lobby. That position shapes what SEPA can and cannot do. We want to understand what it is worth and where it runs out.",
    questions: [
      {
        id: "q11",
        prompt:
          "Where does staying neutral get SEPA something nobody else can get?",
        helper:
          "The access, the conversation, the room. Something a partisan organization could not have.",
        blocks: [
          {
            id: "q11_a",
            type: "text",
            label: "What neutrality earns:",
            placeholder: "One or two sentences.",
            maxWords: 40,
          },
        ],
      },
      {
        id: "q12",
        prompt: "Does leading ever pull against staying neutral?",
        helper: "If it does, where is the line?",
        blocks: [
          {
            id: "q12_a",
            type: "textarea",
            label: "Where leading and neutrality pull apart:",
            placeholder:
              "If you don't think they do, say that and say why. Short is fine.",
            minWords: 10,
            maxWords: 120,
            optional: true,
          },
          {
            id: "q12_b",
            type: "spectrum",
            leftLabel: "Neutral convener",
            rightLabel: "Leading voice",
            min: 0,
            max: 100,
            default: 50,
          },
        ],
      },
    ],
  },
  {
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
  },
  {
    id: "s7",
    number: "07",
    title: "A line to test",
    blurb:
      "One idea from our early thinking, put in front of you to test rather than to approve. Tell us where it holds and where it needs work. Both halves are useful.",
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
              "Doesn't sound like us",
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
  },
  {
    id: "s8",
    number: "08",
    title: "Closer to your work",
    blurb:
      "Three areas. Answer the one nearest to what you do and skip the rest. Every question in this section is optional.",
    questions: [
      {
        id: "q_puf",
        prompt: "SEPA and Public Utilities Fortnightly.",
        helper:
          "\u201cPowered by SEPA\u201d sits on the site today. It reads more like ownership than endorsement.",
        blocks: [
          {
            id: "q_puf_a",
            type: "text",
            label:
              "Describe PUF to someone who has never heard of it, without mentioning SEPA:",
            placeholder: "One or two sentences.",
            maxWords: 40,
            optional: true,
          },
          {
            id: "q_puf_b",
            type: "text",
            label:
              "What is PUF's authority built on, and what would put it at risk?",
            placeholder: "Both halves.",
            maxWords: 40,
            optional: true,
          },
          {
            id: "q_puf_c",
            type: "spectrum",
            leftLabel: "Two brands, each standing on its own",
            rightLabel: "One brand, one voice",
            min: 0,
            max: 100,
            default: 50,
          },
        ],
      },
      {
        id: "q_members",
        prompt: "Members through a rebrand.",
        helper:
          "Members are the reason SEPA exists. Carrying them through a rebrand, and having them feel closer to it at the end, is the priority.",
        blocks: [
          {
            id: "q_mem_a",
            type: "text",
            label: "Someone who has been a member a long time. What keeps them?",
            placeholder: "The real reason, not the renewal-deck reason.",
            maxWords: 30,
            optional: true,
          },
          {
            id: "q_mem_b",
            type: "text",
            label:
              "New name, new brand, eighteen months from now. What would make that member feel dropped?",
            placeholder: "Be specific about what they'd notice.",
            maxWords: 40,
            optional: true,
          },
          {
            id: "q_mem_c",
            type: "text",
            label: "And what would make them feel part of it?",
            placeholder: "The thing that would land well.",
            maxWords: 40,
            optional: true,
          },
        ],
      },
      {
        id: "q_influence",
        prompt: "Research and influence.",
        helper:
          "The research is strong. The step that turns it into influence is the one in question.",
        blocks: [
          {
            id: "q_inf_a",
            type: "text",
            label:
              "A piece of SEPA research that changed a decision somewhere. How do you know it did?",
            placeholder: "Name it, and name the evidence.",
            maxWords: 40,
            optional: true,
          },
          {
            id: "q_inf_b",
            type: "text",
            label:
              "If everything SEPA published this year had to add up to one argument, what would it be?",
            placeholder: "One sentence.",
            maxWords: 30,
            optional: true,
          },
        ],
      },
    ],
  },
  {
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
  },
  {
    id: "s10",
    number: "10",
    title: "Twelve months from now",
    blurb: "If this work has done its job.",
    questions: [
      {
        id: "q18",
        prompt: "How do you walk into the room?",
        helper: "The feeling, not the metric.",
        blocks: [
          {
            id: "q18_a",
            type: "single_select",
            label: "Walking into a meeting with a member, I now feel:",
            options: [
              "Confident",
              "Understood",
              "Trusted",
              "In command",
              "Prepared",
              "Apologetic",
              "Cautious",
              "Much the same",
            ],
          },
          {
            id: "q18_b",
            type: "single_select",
            label: "Walking into a meeting with a regulator, I now feel:",
            options: [
              "Confident",
              "Understood",
              "Trusted",
              "In command",
              "Prepared",
              "Apologetic",
              "Cautious",
              "Much the same",
            ],
          },
          {
            id: "q18_c",
            type: "single_select",
            label: "Walking into a conversation with a journalist, I now feel:",
            options: [
              "Confident",
              "Understood",
              "Trusted",
              "In command",
              "Prepared",
              "Apologetic",
              "Cautious",
              "Much the same",
            ],
          },
        ],
      },
      {
        id: "respondent",
        prompt: "Before you submit.",
        helper:
          "Identifying yourself is optional. It lets us follow up on something you said and weigh responses properly, but an anonymous response is just as welcome.",
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
            placeholder: "SEPA, PUF, member organization, board, other.",
            maxWords: 10,
            optional: true,
          },
        ],
      },
    ],
  },
  {
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
  },
];

// Flat list of every field id, useful for building Smartsheet rows.
export function getAllFieldIds() {
  const ids = [];
  for (const section of sections) {
    for (const q of section.questions) {
      for (const b of q.blocks) {
        ids.push(b.id);
      }
    }
  }
  return ids;
}
