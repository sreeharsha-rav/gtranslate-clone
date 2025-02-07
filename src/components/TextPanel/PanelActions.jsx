import { Volume2, Copy, Loader2 } from "lucide-react";
import { memo } from "react";
import PropTypes from "prop-types";

const PanelActions = memo(
  ({ onCopy, onSpeak, canSpeak, canCopy, isSpeaking }) => (
    <div className="absolute bottom-4 right-4 flex gap-2">
      {canSpeak && (
        <button
          onClick={onSpeak}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Speak text"
          disabled={isSpeaking}
        >
          {isSpeaking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      )}

      {canCopy && (
        <button
          onClick={onCopy}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Copy text"
        >
          <Copy className="w-4 h-4" />
        </button>
      )}
    </div>
  )
);

PanelActions.propTypes = {
  onCopy: PropTypes.func,
  onSpeak: PropTypes.func,
  canSpeak: PropTypes.bool,
  canCopy: PropTypes.bool,
  isSpeaking: PropTypes.bool,
};

PanelActions.displayName = "PanelActions";

export default PanelActions;
