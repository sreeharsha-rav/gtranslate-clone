import { memo } from "react";
import PropTypes from "prop-types";

const LanguageDropdown = memo(({ languages, selected, onSelect, label }) => {
  return (
    <div className="dropdown w-30">
      <button
        className="btn btn-secondary btn-sm font-medium w-full"
        aria-label={label}
      >
        {selected.name}
      </button>

      <ul className="p-2 dropdown-content bg-base-100 shadow-lg w-40 max-h-60 overflow-y-auto">
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className="btn btn-ghost btn-sm btn-block justify-start"
              onClick={() => onSelect(lang)}
              aria-label={`Select ${lang.name}`}
            >
              <span className="badge badge-sm badge-primary">
                {lang.code.toUpperCase()}
              </span>
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

LanguageDropdown.propTypes = {
  label: PropTypes.string,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

LanguageDropdown.displayName = "LanguageDropdown";

export default LanguageDropdown;
