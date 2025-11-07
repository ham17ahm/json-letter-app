// components/JsonInput.jsx
import {
  colors,
  radius,
  spacing,
  typography,
  mergeStyles,
} from "../lib/styles";

export default function JsonInput({ value, onChange }) {
  const textareaStyle = {
    width: "100%",
    border: `1px solid ${colors.gray500}`,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontFamily: typography.monoFamily,
  };

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={12}
      spellCheck={false}
      style={textareaStyle}
    />
  );
}
