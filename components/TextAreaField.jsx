// components/TextAreaField.jsx
import { commonStyles } from "../lib/styles";

/**
 * Reusable textarea field with label
 * @param {string} label - The label text to display above the textarea
 * @param {string} value - The current value of the textarea
 * @param {function} onChange - Callback when value changes
 * @param {string} placeholder - Placeholder text for the textarea
 * @param {number} rows - Number of rows for the textarea (default: 4)
 */
export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}) {
  return (
    <div>
      <label style={commonStyles.label}>{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={commonStyles.textarea}
      />
    </div>
  );
}
