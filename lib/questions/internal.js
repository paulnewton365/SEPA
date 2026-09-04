// INTERNAL BUILD ONLY.
//
// Nothing in this file is ever compiled into the external bundle. The
// build script writes one audience's schema to lib/questions.generated.js
// and the app imports only that, so these questions do not appear in the
// external site's JavaScript, in the DOM, or in view-source.
//
// The test for belonging here: does the question assume the respondent
// works at SEPA, sits on the board, or has visibility into how SEPA
// operates internally? If yes, it goes here.

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

const nameCostQuestion = {
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
};

const neutralityLineQuestion = {
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
};

const modulesSection = {
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
};

const roomsQuestion = {
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
};

export const sections = [
  openSection("internal"),
  whatWhyHowSection,
  claritySection,
  {
    ...nameSection("internal"),
    questions: [
      nameSection("internal").questions[0],
      nameCostQuestion,
      nameSection("internal").questions[1],
    ],
  },
  {
    id: "s5",
    number: "05",
    title: "Neutrality",
    blurb:
      "SEPA does not lobby. That position shapes what SEPA can and cannot do. We want to understand what it is worth and where it runs out.",
    questions: [neutralityQuestion, neutralityLineQuestion],
  },
  momentSection,
  hypothesisSection("internal"),
  modulesSection,
  positionSection,
  {
    id: "s10",
    number: "10",
    title: "Twelve months from now",
    blurb: "If this work has done its job.",
    questions: [roomsQuestion, respondentQuestion],
  },
  finalSection,
];
