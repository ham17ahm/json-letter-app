// components/TextField.jsx
import { commonStyles } from "../lib/styles";

/**
 * Reusable text input field with label
 * @param {string} label - The label text to display above the input
 * @param {string} value - The current value of the input
 * @param {function} onChange - Callback when value changes
 * @param {string} placeholder - Placeholder text for the input
 */
export default function TextField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={commonStyles.label}>{label}</label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={commonStyles.textInput}
      />
    </div>
  );
}
