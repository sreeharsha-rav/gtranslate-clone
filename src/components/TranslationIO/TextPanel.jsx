import PropTypes from "prop-types";
import { memo } from "react";

const TextPanel = memo(
  ({ value, onChange, isReadOnly = false, placeholder }) => {
    return (
      <textarea
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        aria-label={isReadOnly ? "Translation output" : "Translation input"}
        className="textarea textarea-ghost w-full min-h-[150px] text-xl resize-none focus:outline-none"
        placeholder={placeholder}
      />
    );
  }
);

TextPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool,
  placeholder: PropTypes.string,
};

TextPanel.displayName = "TextPanel";

export default TextPanel;
