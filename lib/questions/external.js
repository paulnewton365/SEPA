// EXTERNAL BUILD ONLY. Members, partners, regulators, readers, observers.
//
// Disclosure level for this audience: a rebrand is happening, and a change
// of name is under consideration with no decision made. Nothing here
// implies a rename is settled, and nothing reveals internal governance,
// commercial arrangements, or the SEPA/PUF architecture options.
//
// The design principle: outsiders are asked about their own experience of
// SEPA, never asked to speculate about how SEPA runs. "Where has the name
// cost you" is an insider question. "What do you find yourself adding when
// you explain SEPA" is the outside-in equivalent, and it gets at the same
// underlying problem from a source that can actually answer it.

import {
  openSection,
  whatWhyHowSection,
  claritySection,
  nameSection,
  neutralityQuestion,
  momentSection,
  hypothesisSection,
  positionSection,
  respondentQuestion,
  finalSection,
} from "./shared.js";

// The outside-in counterpart to the internal "where has the name cost you".
const explainingQuestion = {
  id: "q9x",
  prompt: "When you explain SEPA to someone who doesn't know it, what do you add?",
  helper:
    "Most names need a sentence of help. We want to know what that sentence is for SEPA, and whether you find yourself reaching for it often.",
  blocks: [
    {
      id: "q9x_a",
      type: "text",
      label: "The sentence you add after saying the name:",
      placeholder: "What you find yourself explaining.",
      maxWords: 40,
    },
    {
      id: "q9x_b",
      type: "single_select",
      label: "How often does the name need that explanation?",
      options: [
        "Almost every time",
        "Often",
        "Sometimes",
        "Rarely",
        "Never, it's understood",
      ],
    },
  ],
};

// Relationship questions. These replace the internal membership module and
// ask people about their own decision rather than about members in general.
const relationshipSection = {
  id: "s8x",
  number: "08",
  title: "You and SEPA",
  blurb:
    "Your own experience rather than a view on the organization. Skip anything that doesn't apply to you.",
  questions: [
    {
      id: "q_join",
      prompt: "What brought you in, and what keeps you?",
      helper:
        "If you're a member or partner. If you're neither, skip to the next question.",
      blocks: [
        {
          id: "q_join_a",
          type: "text",
          label: "What you were hoping to get when you first engaged with SEPA:",
          placeholder: "The original reason.",
          maxWords: 30,
          optional: true,
        },
        {
          id: "q_join_b",
          type: "text",
          label: "What actually keeps you involved now:",
          placeholder: "If it's different from the above, that's interesting.",
          maxWords: 30,
          optional: true,
        },
        {
          id: "q_join_c",
          type: "text",
          label: "What nearly stopped you, or what almost put you off?",
          placeholder: "Hesitations count. So does cost, time, or relevance.",
          maxWords: 30,
          optional: true,
        },
      ],
    },
    {
      id: "q_alt",
      prompt: "Where else do you go?",
      helper:
        "For the same thing SEPA gives you. Other organizations, publications, events, or informal networks.",
      blocks: [
        {
          id: "q_alt_a",
          type: "text",
          label: "Where else you turn:",
          placeholder: "Name them.",
          maxWords: 30,
          optional: true,
        },
        {
          id: "q_alt_b",
          type: "text",
          label: "What they give you that SEPA doesn't:",
          placeholder: "Be blunt. This is the most useful answer on the page.",
          maxWords: 40,
          optional: true,
        },
      ],
    },
    {
      id: "q_puf_read",
      prompt: "Public Utilities Fortnightly.",
      helper:
        "Some context in case this is new to you. Public Utilities Fortnightly is a publication that has covered the sector for over a century, with its own readership and editorial voice. SEPA acquired it at the end of 2024, so the two now sit together while still looking and sounding like separate things. How closely they should be connected is one of the questions this project has to answer, and a reader's view on that is worth more than ours.",
      blocks: [
        {
          id: "q_pufx_a",
          type: "single_select",
          label: "Your relationship with PUF:",
          options: [
            "I read it regularly",
            "I read it occasionally",
            "I've written for it",
            "I know of it but don't read it",
            "I hadn't heard of it",
          ],
        },
        {
          id: "q_pufx_b",
          type: "text",
          label:
            "If you know it: what is PUF good for, and what would you not want changed?",
          placeholder: "Skip if it isn't familiar.",
          maxWords: 40,
          optional: true,
        },
      ],
    },
  ],
};

// The external counterpart to the internal "walking into rooms" question.
// Same intent, asked of someone who does not represent SEPA.
const futureQuestion = {
  id: "q18x",
  prompt: "A year from now, if this work has gone well.",
  helper: "From where you sit.",
  blocks: [
    {
      id: "q18x_a",
      type: "single_select",
      label: "The thing that would most improve your view of SEPA:",
      options: [
        "Clearer about what it stands for",
        "Easier to explain to colleagues",
        "More visible in the sector",
        "More useful day to day",
        "More willing to take a position",
        "Better at including people like me",
      ],
    },
    {
      id: "q18x_b",
      type: "text",
      label: "What would make you recommend SEPA to a peer?",
      placeholder: "The thing that would tip it.",
      maxWords: 30,
    },
  ],
};

export const sections = [
  openSection("external"),
  whatWhyHowSection,
  claritySection,
  {
    ...nameSection("external"),
    questions: [
      nameSection("external").questions[0],
      explainingQuestion,
      nameSection("external").questions[1],
    ],
  },
  {
    id: "s5",
    number: "05",
    title: "Neutrality",
    blurb:
      "SEPA does not lobby and does not take sides between its members. We want to understand what that position is worth from the outside.",
    questions: [neutralityQuestion],
  },
  momentSection,
  hypothesisSection("external"),
  relationshipSection,
  positionSection,
  {
    id: "s10",
    number: "10",
    title: "A year from now",
    blurb: "If this work has done its job.",
    questions: [futureQuestion, respondentQuestion],
  },
  finalSection,
];
