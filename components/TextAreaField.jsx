// components/TextAreaField.jsx
import { useState } from "react";
import { commonStyles } from "../lib/styles";
import QuickPhraseButtons from "./QuickPhraseButtons";

/**
 * Reusable textarea field with label and optional quick phrase buttons
 * @param {string} label - The label text to display above the textarea
 * @param {string} value - The current value of the textarea
 * @param {function} onChange - Callback when value changes
 * @param {string} placeholder - Placeholder text for the textarea
 * @param {number} rows - Number of rows for the textarea (default: 4)
 * @param {string} fieldName - Optional field name for quick phrases (e.g., 'inquiry', 'prayer_sentence')
 */
export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  fieldName,
}) {
  const [isFocused, setIsFocused] = useState(false);

  // Handle appending phrase text to existing content
  const handlePhraseClick = (phraseText) => {
    const currentValue = value ?? "";
    const newValue = currentValue
      ? `${currentValue} ${phraseText}`
      : phraseText;
    onChange(newValue);
  };

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    },
  };

  return (
    <div>
      <label style={commonStyles.label}>{label}</label>
      <div style={styles.inputContainer}>
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={rows}
          style={commonStyles.textarea}
        />
        <QuickPhraseButtons
          fieldName={fieldName}
          onPhraseClick={handlePhraseClick}
          isVisible={isFocused}
        />
      </div>
    </div>
  );
}
