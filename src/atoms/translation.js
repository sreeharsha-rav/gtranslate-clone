import { atom } from "jotai";
import { translateText } from "../api";

// original base atoms
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
export const sourceTextAtom = atom("");
export const targetTextAtom = atom("");

// derived atoms
export const canTranslateAtom = atom((get) => {
  const sourceLanguage = get(sourceLanguageAtom);
  const targetLanguage = get(targetLanguageAtom);

  return (
    sourceLanguage.code !== targetLanguage.code &&
    get(sourceTextAtom).length > 0
  );
});

// Add loading state
export const translationLoadingAtom = atom(false);

// Enhanced async translation atom
export const translateAtom = atom(null, async (get, set) => {
  try {
    set(translationLoadingAtom, true);

    const sourceText = get(sourceTextAtom);
    const sourceLanguage = get(sourceLanguageAtom);
    const targetLanguage = get(targetLanguageAtom);

    if (!get(canTranslateAtom)) {
      set(targetTextAtom, "");
      return;
    }

    const translation = await translateText(
      sourceText,
      sourceLanguage.code,
      targetLanguage.code
    );

    set(targetTextAtom, translation);
  } catch (error) {
    // Add error handling
    console.error("Translation failed:", error);
    set(targetTextAtom, ""); // or set an error message
  } finally {
    set(translationLoadingAtom, false);
  }
});

// Add error handling
// export const translationErrorAtom = atom(null);
