import TextPanel from "./TextPanel";
import PanelActions from "./PanelActions";
import { useAtomValue, useSetAtom } from "jotai";
import { targetTextAtom } from "../../atoms/translation";
import { targetLanguageAtom } from "../../atoms/index";
import { speakOutputAtom, outputTTSLoadingAtom } from "../../atoms/tts";
import { useCallback } from "react";

const TranslationOutput = () => {
  const targetText = useAtomValue(targetTextAtom);
  const speak = useSetAtom(speakOutputAtom);
  const isLoading = useAtomValue(outputTTSLoadingAtom);
  const language = useAtomValue(targetLanguageAtom);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(targetText);
  }, [targetText]);

  const handleSpeak = useCallback(() => {
    speak();
    console.log("Speaking...");
  }, [speak]);

  return (
    <div className="relative bg-base-100 rounded-box p-4 shadow-sm border border-base-300">
      <TextPanel
        value={targetText}
        onChange={() => {}}
        isReadOnly={true}
        placeholder="Translation will appear here"
      />
      <PanelActions
        onCopy={handleCopy}
        onSpeak={handleSpeak}
        canSpeak={targetText.length > 0 && language?.tts}
        canCopy={targetText.length > 0}
        isSpeaking={isLoading}
      />
    </div>
  );
};

export default TranslationOutput;
