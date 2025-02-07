import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import PanelActions from "./PanelActions";
import { useSetAtom, useAtomValue } from "jotai";
import {
  speakInputAtom,
  speakOutputAtom,
  inputTTSLoadingAtom,
  outputTTSLoadingAtom,
} from "../../atoms/tts";
import {
  sourceLanguageAtom,
  targetLanguageAtom,
} from "../../atoms/translation";

const TextPanel = memo(({ value, onChange, isReadOnly = false }) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
  }, [value]);

  // Get the appropriate atoms based on whether this is input or output
  const speakAtom = isReadOnly ? speakOutputAtom : speakInputAtom;
  const loadingAtom = isReadOnly ? outputTTSLoadingAtom : inputTTSLoadingAtom;
  const languageAtom = isReadOnly ? targetLanguageAtom : sourceLanguageAtom;

  const speak = useSetAtom(speakAtom);
  const isLoading = useAtomValue(loadingAtom);
  const language = useAtomValue(languageAtom);

  const handleSpeak = useCallback(async () => {
    speak();
    console.log("Speaking...");
  }, [speak]);

  return (
    <div className="relative bg-base-100 rounded-box p-4 shadow-sm border border-base-300">
      <textarea
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        aria-label={isReadOnly ? "Translation output" : "Translation input"}
        className="textarea textarea-ghost w-full min-h-[150px] text-xl resize-none focus:outline-none"
        placeholder={
          isReadOnly
            ? "Translation will appear here"
            : "Enter text to translate"
        }
      />

      <PanelActions
        onCopy={handleCopy}
        onSpeak={handleSpeak}
        canSpeak={value.length > 0 && language?.tts}
        canCopy={value.length > 0}
        isSpeaking={isLoading}
      />
    </div>
  );
});

TextPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
};

TextPanel.displayName = "TextPanel";

export default TextPanel;
