import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import PanelActions from "./PanelActions";

const TextPanel = memo(({ value, onChange, language, isReadOnly = false }) => {
  const handleCopy = useCallback(() => {
    console.log(`Copying ${value} to clipboard`);
    navigator.clipboard.writeText(value);
  }, [value]);

  const handleSpeak = useCallback(() => {
    // TTS implementation
    // const utterance = new SpeechSynthesisUtterance(value);
    // utterance.lang = language.code;
    // speechSynthesis.speak(utterance);
    console.log(`Speaking ${value} in ${language.code}`);
  }, [value, language]);

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
        canSpeak={value.length > 0}
        canCopy={value.length > 0}
      />
    </div>
  );
});

TextPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  isReadOnly: PropTypes.bool,
};

TextPanel.displayName = "TextPanel";

export default TextPanel;
