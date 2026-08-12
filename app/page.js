"use client";

import PasswordGate from "../components/PasswordGate";
import Questionnaire from "../components/Questionnaire";

export default function Page() {
  return (
    <PasswordGate>
      <Questionnaire />
    </PasswordGate>
  );
}
