import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { transcribeAudio } from "../api";
import { sourceLanguageAtom } from "./index";
import { sourceTextAtom } from "./translation";

// Base atoms
export const isListeningAtom = atom(false);
export const isProcessingVoiceAtom = atom(false);
export const recognitionAtom = atomWithReset(null);

const chunksAtom = atom([]);

// Derived atom to handle speech recognition
export const speechRecognitionAtom = atom(
  (get) => get(chunksAtom),
  async (get, set, action) => {
    switch (action.type) {
      case "START": {
        if (get(isListeningAtom)) return; // Already listening
        set(chunksAtom, []);
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            const recorder = new MediaRecorder(stream);
            recorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                set(chunksAtom, (prev) => [...prev, event.data]);
              }
            };
            recorder.onstop = async () => {
              set(isListeningAtom, false);
              set(isProcessingVoiceAtom, true);
              const blobParts = get(chunksAtom);
              if (blobParts.length) {
                const blob = new Blob(blobParts, { type: "audio/webm" });
                const reader = new FileReader();
                reader.onloadend = async () => {
                  const base64Audio = reader.result.split(",")[1];
                  const languageCode = get(sourceLanguageAtom).ttsCode[0];
                  console.log("Transcribing audio for language:", languageCode);
                  const sttResult = await transcribeAudio(
                    base64Audio,
                    languageCode
                  );
                  if (sttResult.text) {
                    set(sourceTextAtom, sttResult.text);
                  }
                  set(isProcessingVoiceAtom, false);
                  set(chunksAtom, []);
                };
                reader.readAsDataURL(blob);
              } else {
                set(isProcessingVoiceAtom, false);
              }
            };
            recorder.start();
            set(recognitionAtom, recorder);
            set(isListeningAtom, true);
          })
          .catch((error) => {
            console.error("MediaRecorder error:", error);
            set(isListeningAtom, false);
          });
        break;
      }
      case "STOP": {
        const recorder = get(recognitionAtom);
        if (recorder) {
          recorder.stop();
        }
        break;
      }
      default:
        console.error("Unknown speech recognition action:", action);
    }
  }
);
