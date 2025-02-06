// import { sourceTextAtom } from "../atoms/translation";
import { useAtom } from "jotai";
import { isListeningAtom } from "../atoms/voice";
import { Mic, MicOff } from "lucide-react";

const VoiceInput = () => {
  // const setSourceText = useSetAtom(sourceTextAtom);
  const [isListening, setIsListening] = useAtom(isListeningAtom);

  // const handleVoiceInput = useCallback(async () => {
  //   try {
  //     const recognition = new window.webkitSpeechRecognition();
  //     recognition.lang = 'en-US';

  //     recognition.onresult = (event) => {
  //       const transcript = event.results[0][0].transcript;
  //       setInputText(prev => prev + ' ' + transcript);
  //     };

  //     recognition.start();
  //     setIsListening(true);

  //     recognition.onend = () => {
  //       setIsListening(false);
  //     };
  //   } catch (error) {
  //     console.error('Speech recognition failed:', error);
  //   }
  // }, [setInputText]);

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      console.log("Voice input is stopped.. 🛑");
    } else {
      setIsListening(true);
      console.log("Voice input is listening.. 🎤");
    }
  };

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
