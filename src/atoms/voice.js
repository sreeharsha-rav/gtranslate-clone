import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

// Base atoms
export const isListeningAtom = atom(false);
export const recognitionAtom = atomWithReset(null);

// Configuration
const SPEECH_CONFIG = {
  continuous: true,
  interimResults: true,
  lang: "en-IN",
};

// Derived atom to handle speech recognition
export const speechRecognitionAtom = atom(
  (get) => get(recognitionAtom),
  (get, set, action) => {
    switch (action.type) {
      case "START": {
        if (get(isListeningAtom)) return; // Already listening

        try {
          const recognition = new window.webkitSpeechRecognition();
          Object.assign(recognition, SPEECH_CONFIG);

          // Configure recognition handlers
          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join(" ");
            action.onTranscript?.(transcript);
          };

          recognition.onend = () => {
            set(isListeningAtom, false);
            set(recognitionAtom, null);
          };

          recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            set(isListeningAtom, false);
            set(recognitionAtom, null);
          };

          // Start recognition
          recognition.start();
          set(recognitionAtom, recognition);
          set(isListeningAtom, true);
        } catch (error) {
          console.error("Speech recognition failed:", error);
          set(isListeningAtom, false);
          set(recognitionAtom, null);
        }
        break;
      }
      case "STOP": {
        const recognition = get(recognitionAtom);
        if (recognition) {
          recognition.stop();
          set(recognitionAtom, null);
        }
        set(isListeningAtom, false);
        break;
      }
      default:
        console.error("Unknown speech recognition action:", action);
    }
  }
);
