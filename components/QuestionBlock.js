"use client";

import TextField from "./inputs/TextField";
import TextArea from "./inputs/TextArea";
import Slider from "./inputs/Slider";
import Spectrum from "./inputs/Spectrum";
import SingleSelect from "./inputs/SingleSelect";
import MultiSelect from "./inputs/MultiSelect";
import WordBank from "./inputs/WordBank";

const map = {
  text: TextField,
  textarea: TextArea,
  slider: Slider,
  spectrum: Spectrum,
  single_select: SingleSelect,
  multi_select: MultiSelect,
  word_bank: WordBank,
};

export default function QuestionBlock({ block, value, onChange }) {
  const Component = map[block.type];
  if (!Component) {
    return (
      <div className="text-sm text-accent">
        Unknown input type: {block.type}
      </div>
    );
  }
  return <Component block={block} value={value} onChange={onChange} />;
}
