// import { sourceTextAtom } from "../atoms/translation";
import { useAtom, useSetAtom } from "jotai";
import { isListeningAtom, speechRecognitionAtom } from "../atoms/voice";
import { sourceTextAtom } from "../atoms/translation";
import { Mic, MicOff } from "lucide-react";
import { useCallback } from "react";

const VoiceInput = () => {
  const [isListening] = useAtom(isListeningAtom);
  const [, dispatch] = useAtom(speechRecognitionAtom);
  const setSourceText = useSetAtom(sourceTextAtom);

  const handleVoiceInput = useCallback(() => {
    // use WebkitSpeechRecognition
    if (isListening) {
      dispatch({ type: "STOP" });
      console.log("Voice input is stopped.. 🛑");
    } else {
      dispatch({
        type: "START",
        onTranscript: (transcript) => setSourceText(transcript),
      });
      console.log("Voice input is listening.. 🎤");
    }
  }, [isListening, dispatch, setSourceText]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {isListening ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <p className="text-md text-gray-500">input voice to translate</p>
      )}
      <button
        className={`btn btn-circle btn-xl ${
          isListening ? "btn-error" : "btn-primary"
        }`}
        onClick={handleVoiceInput}
        aria-label={isListening ? "Stop voice input" : "Start voice input"}
      >
        {isListening ? <MicOff size={32} /> : <Mic size={32} />}
      </button>
    </div>
  );
};

export default VoiceInput;
