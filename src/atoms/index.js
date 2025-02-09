import { atom } from "jotai";

// Language base atoms
export const sourceLanguageAtom = atom({
  name: "English",
  code: "en",
  tts: true,
  ttsCode: ["en-IN"],
  ttsName: "en-IN-Standard-A",
  ssmlGender: "FEMALE",
});

export const targetLanguageAtom = atom({
  name: "Hindi",
  code: "hi",
  tts: true,
  ttsCode: ["hi-IN"],
  ttsName: "hi-IN-Standard-A",
  ssmlGender: "FEMALE",
});
