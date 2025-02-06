import { atom } from "jotai";
import { env } from "../config";

// original base atoms
export const sourceLanguageAtom = atom({ name: "English", code: "en" });
export const targetLanguageAtom = atom({ name: "Hindi", code: "hi" });
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

// derived async atom
export const translateAtom = atom(null, async (get, set) => {
  const sourceText = get(sourceTextAtom);
  const sourceLanguage = get(sourceLanguageAtom);
  const targetLanguage = get(targetLanguageAtom);

  if (!get(canTranslateAtom)) {
    set(targetTextAtom, "");
    return;
  }

  try {
    const response = await fetch(`${env.API_BASE_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: sourceText,
        sourceLang: sourceLanguage.code,
        targetLang: targetLanguage.code,
      }),
    });

    if (!response.ok) {
      throw new Error("Translation failed");
    }

    const { translation } = await response.json();
    set(targetTextAtom, translation);
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
});
