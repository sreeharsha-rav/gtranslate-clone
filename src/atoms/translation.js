import { atom } from "jotai";
import { translateText } from "../api";
import { sourceLanguageAtom, targetLanguageAtom } from "./index";

// text base atoms
export const sourceTextAtom = atom("");
export const targetTextAtom = atom("");

// derived atoms
export const canTranslateAtom = atom((get) => {
  const sourceLanguage = get(sourceLanguageAtom);
  const targetLanguage = get(targetLanguageAtom);

  return (
    sourceLanguage.code !== targetLanguage.code &&
    get(sourceTextAtom).trim().length > 0
  );
});

// Optional TODO: Loading state atoms
// export const translationLoadingAtom = atom(false);
// export const translationErrorAtom = atom(null);

// Enhanced async translation atom
export const translateAtom = atom(null, async (get, set) => {
  try {
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
  }
});
