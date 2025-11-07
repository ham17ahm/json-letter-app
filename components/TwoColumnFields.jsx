// components/TwoColumnFields.jsx
import TextField from "./TextField";
import { spacing } from "../lib/styles";

/**
 * Two-column layout for full_name and location fields
 * @param {object} record - The record data
 * @param {function} onUpdate - Callback to update a field: (key, value) => void
 */
export default function TwoColumnFields({ record, onUpdate }) {
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: spacing.md,
      marginBottom: spacing.md,
    },
  };

  return (
    <div style={styles.grid}>
      <TextField
        label="Full name"
        value={record?.full_name}
        onChange={(value) => onUpdate("full_name", value)}
        placeholder="Full name"
      />

      <TextField
        label="Location"
        value={record?.location}
        onChange={(value) => onUpdate("location", value)}
        placeholder="Location"
      />
    </div>
  );
}
