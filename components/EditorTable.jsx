// components/EditorTable.jsx
import RecordCard from "./RecordCard";
import { spacing } from "../lib/styles";

/**
 * Main table component that renders all records
 * @param {array} records - Array of record objects
 * @param {array} columns - Column definitions (currently unused, kept for API compatibility)
 * @param {function} onChange - Callback to update the entire records array
 */
export default function EditorTable({ records, columns, onChange }) {
  /**
   * Update a single field in a specific record
   * @param {number} rowIndex - The index of the record to update
   * @param {string} key - The field key to update
   * @param {*} value - The new value
   */
  function updateField(rowIndex, key, value) {
    onChange((prev) => {
      const next = [...prev];
      next[rowIndex] = { ...next[rowIndex], [key]: value };
      return next;
    });
  }

  const styles = {
    container: {
      display: "grid",
      gap: spacing.lg,
    },
  };

  return (
    <div style={styles.container}>
      {records.map((record, index) => (
        <RecordCard
          key={index}
          record={record}
          index={index}
          onUpdate={(key, value) => updateField(index, key, value)}
        />
      ))}
    </div>
  );
}
