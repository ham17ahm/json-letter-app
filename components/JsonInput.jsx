// components/JsonInput.jsx
export default function JsonInput({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={12}
      spellCheck={false}
      style={{
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 12,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      }}
    />
  );
}
