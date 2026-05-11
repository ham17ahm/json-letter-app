"use client";

import CardHeader from "./CardHeader";
import TwoColumnFields from "../../components/TwoColumnFields";
import TextAreaField from "../../components/TextAreaField";
import ExtraFields from "../../components/ExtraFields";
import { REQUIRED_KEYS } from "../../lib/constants";
import { commonStyles, spacing } from "../../lib/styles";

export default function RecordCard({ record, index, onUpdate }) {
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
      <CardHeader recordNumber={index + 1} />

      <TwoColumnFields record={record} onUpdate={onUpdate} />

      {/* Inquiry field WITH quick phrases */}
      <div style={styles.fieldContainer}>
        <TextAreaField
          label="Inquiry"
          value={record?.inquiry}
          onChange={(value) => onUpdate("inquiry", value)}
          placeholder="Write the inquiry…"
          rows={4}
          fieldName="inquiry"
        />
      </div>

      {/* Note field removed */}

      {/* Prayer sentence field WITH quick phrases */}
      <div style={styles.fieldContainer}>
        <TextAreaField
          label="Prayer sentence"
          value={record?.prayer_sentence}
          onChange={(value) => onUpdate("prayer_sentence", value)}
          placeholder="Write the prayer sentence…"
          rows={3}
          fieldName="prayer_sentence"
        />
      </div>

      <ExtraFields extraKeys={extraKeys} record={record} onUpdate={onUpdate} />
    </div>
  );
}
