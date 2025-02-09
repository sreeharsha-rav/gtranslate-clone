import { atom } from "jotai";
import { synthesizeSpeech } from "../api";
import { sourceLanguageAtom, targetLanguageAtom } from "./index";
import { sourceTextAtom, targetTextAtom } from "./translation";

// speech base atoms
export const sourceSpeechAtom = atom(null);
export const targetSpeechAtom = atom(null);

// Loading state atoms
export const isSpeakingAtom = atom(false);
export const inputTTSLoadingAtom = atom(false);
export const outputTTSLoadingAtom = atom(false);

// Error state atoms
export const inputTTSErrorAtom = atom(null);
export const outputTTSErrorAtom = atom(null);

// TTS atoms for input and output
export const speakInputAtom = atom(null, async (get, set) => {
  try {
    set(inputTTSLoadingAtom, true);
    set(inputTTSErrorAtom, null);

    const sourceText = get(sourceTextAtom);
    const sourceLanguage = get(sourceLanguageAtom);

    if (!sourceText || !sourceLanguage.tts) return;

    const voice = {
      languageCode: sourceLanguage.ttsCode[0], // Use first available tts code
      name: sourceLanguage.ttsName,
      ssmlGender: sourceLanguage.ssmlGender,
    };

    const audio = await synthesizeSpeech(sourceText, voice);
    if (audio) {
      // Add event listeners for better state management
      audio.addEventListener("ended", () => {
        set(inputTTSLoadingAtom, false);
      });

      audio.addEventListener("error", () => {
        set(inputTTSErrorAtom, "Failed to play audio");
        set(inputTTSLoadingAtom, false);
      });

      await audio.play();
    }
  } catch (error) {
    set(inputTTSErrorAtom, error.message);
    console.error("Input TTS failed:", error);
  } finally {
    set(inputTTSLoadingAtom, false);
  }
});

export const speakOutputAtom = atom(null, async (get, set) => {
  try {
    set(outputTTSLoadingAtom, true);
    set(outputTTSErrorAtom, null);

    const targetText = get(targetTextAtom);
    const targetLanguage = get(targetLanguageAtom);

    if (!targetText || !targetLanguage.tts) return;

    const voice = {
      languageCode: targetLanguage.ttsCode[0], // Use first available tts code
      name: targetLanguage.ttsName,
      ssmlGender: targetLanguage.ssmlGender,
    };

    const audio = await synthesizeSpeech(targetText, voice);
    if (audio) {
      // Add event listeners for better state management
      audio.addEventListener("ended", () => {
        set(outputTTSLoadingAtom, false);
      });

      audio.addEventListener("error", () => {
        set(outputTTSErrorAtom, "Failed to play audio");
        set(outputTTSLoadingAtom, false);
      });

      await audio.play();
    }
  } catch (error) {
    set(outputTTSErrorAtom, error.message);
    console.error("Output TTS failed:", error);
  } finally {
    set(outputTTSLoadingAtom, false);
  }
});
