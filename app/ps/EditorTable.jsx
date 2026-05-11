"use client";

import RecordCard from "./RecordCard";
import { spacing } from "../../lib/styles";

export default function EditorTable({ records, columns, onChange }) {
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
