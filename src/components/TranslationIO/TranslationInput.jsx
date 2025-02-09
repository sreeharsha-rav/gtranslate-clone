/* eslint-disable react-hooks/exhaustive-deps */
import TextPanel from "./TextPanel";
import PanelActions from "./PanelActions";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  sourceTextAtom,
  targetTextAtom,
  canTranslateAtom,
  translateAtom,
} from "../../atoms/translation";
import { useEffect, useCallback } from "react";
import { debounce } from "lodash-es";
import { speakInputAtom, inputTTSLoadingAtom } from "../../atoms/tts";
import { sourceLanguageAtom } from "../../atoms/index";
import { X } from "lucide-react";

const TranslationInput = () => {
  const [sourceText, setSourceText] = useAtom(sourceTextAtom);
  const setTargetText = useSetAtom(targetTextAtom);
  const canTranslate = useAtomValue(canTranslateAtom);
  const translate = useSetAtom(translateAtom);
  const speak = useSetAtom(speakInputAtom);
  const isLoading = useAtomValue(inputTTSLoadingAtom);
  const language = useAtomValue(sourceLanguageAtom);

  const debouncedTranslate = useCallback(
    debounce(() => {
      console.log("Translating...");
      translate();
    }, 500),
    [translate]
  );

  useEffect(() => {
    if (!canTranslate) return;
    debouncedTranslate();

    return () => {
      debouncedTranslate.cancel();
    };
  }, [sourceText, canTranslate, debouncedTranslate]);

  const handleChange = useCallback(
    (e) => {
      setSourceText(e.target.value);
    },
    [setSourceText]
  );

  const handleReset = useCallback(() => {
    setSourceText("");
    setTargetText("");
  }, [setSourceText, setTargetText]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(sourceText);
  }, [sourceText]);

  const handleSpeak = useCallback(() => {
    speak();
    console.log("Speaking...");
  }, [speak]);

  return (
    <div className="relative bg-base-100 rounded-box p-4 shadow-sm border border-base-300">
      {sourceText.length > 0 && (
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 btn btn-ghost btn-sm btn-circle z-10"
          aria-label="Clear text"
        >
          <X size={16} />
        </button>
      )}
      <TextPanel
        value={sourceText}
        onChange={handleChange}
        placeholder="Enter text to translate"
      />
      <PanelActions
        onCopy={handleCopy}
        onSpeak={handleSpeak}
        canSpeak={sourceText.length > 0 && language?.tts}
        canCopy={sourceText.length > 0}
        isSpeaking={isLoading}
      />
    </div>
  );
};

export default TranslationInput;
