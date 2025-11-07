// components/RecordCard.jsx
import CardHeader from "./CardHeader";
import TwoColumnFields from "./TwoColumnFields";
import TextAreaField from "./TextAreaField";
import ExtraFields from "./ExtraFields";
import { REQUIRED_KEYS } from "../lib/constants";
import { commonStyles, spacing } from "../lib/styles";

/**
 * A single record card containing all fields
 * @param {object} record - The record data
 * @param {number} index - The record index (0-based)
 * @param {function} onUpdate - Callback to update a field: (key, value) => void
 */
export default function RecordCard({ record, index, onUpdate }) {
  // Calculate extra keys beyond the required ones
  const extraKeys = Object.keys(record || {}).filter(
    (k) => !REQUIRED_KEYS.includes(k)
  );

  const styles = {
    fieldContainer: {
      marginBottom: spacing.md,
    },
  };

  return (
    <div style={commonStyles.card}>
      {/* Card header with record number */}
      <CardHeader recordNumber={index + 1} />

      {/* Name + Location side by side */}
      <TwoColumnFields record={record} onUpdate={onUpdate} />

      {/* Inquiry field */}
      <div style={styles.fieldContainer}>
        <TextAreaField
          label="Inquiry"
          value={record?.inquiry}
          onChange={(value) => onUpdate("inquiry", value)}
          placeholder="Write the inquiry…"
          rows={4}
        />
      </div>

      {/* Note field */}
      <div style={styles.fieldContainer}>
        <TextAreaField
          label="Note"
          value={record?.note}
          onChange={(value) => onUpdate("note", value)}
          placeholder="Write the guidance/note…"
          rows={4}
        />
      </div>

      {/* Prayer sentence field */}
      <div style={styles.fieldContainer}>
        <TextAreaField
          label="Prayer sentence"
          value={record?.prayer_sentence}
          onChange={(value) => onUpdate("prayer_sentence", value)}
          placeholder="Write the prayer sentence…"
          rows={3}
        />
      </div>

      {/* Extra/dynamic fields */}
      <ExtraFields extraKeys={extraKeys} record={record} onUpdate={onUpdate} />
    </div>
  );
}
