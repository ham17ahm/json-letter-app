// components/EditorTable.jsx
import { REQUIRED_KEYS } from "../lib/constants";
import {
  colors,
  radius,
  spacing,
  typography,
  commonStyles,
  mergeStyles,
} from "../lib/styles";

export default function EditorTable({ records, columns, onChange }) {
  function updateField(rowIndex, key, value) {
    onChange((prev) => {
      const next = [...prev];
      next[rowIndex] = { ...next[rowIndex], [key]: value };
      return next;
    });
  }

  // Component-specific styles
  const styles = {
    container: {
      display: "grid",
      gap: spacing.lg,
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    cardTitle: {
      fontWeight: 600,
    },
    cardSubtitle: {
      marginLeft: "auto",
      fontSize: typography.sizes.xs,
      color: colors.gray600,
    },
    twoColumnGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    fieldContainer: {
      marginBottom: spacing.md,
    },
    extraFieldsContainer: {
      marginTop: spacing.sm,
    },
    extraFieldsTitle: {
      fontSize: typography.sizes.sm,
      color: colors.gray600,
      marginBottom: 6,
    },
    extraFieldsGrid: {
      display: "grid",
      gap: 10,
    },
    extraFieldLabel: {
      display: "block",
      fontSize: typography.sizes.xs,
      color: colors.gray700,
      marginBottom: 4,
    },
    extraFieldInput: {
      ...commonStyles.textInput,
      height: 40,
      fontSize: typography.sizes.base,
    },
  };

  return (
    <div style={styles.container}>
      {records.map((row, i) => {
        // Any extra keys beyond the required ones will also be rendered at the end
        const extraKeys = Object.keys(row || {}).filter(
          (k) => !REQUIRED_KEYS.includes(k)
        );

        return (
          <div key={i} style={commonStyles.card}>
            {/* Card header */}
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Record #{i + 1}</div>
              <div style={styles.cardSubtitle}>
                Required: full_name, location, inquiry, note, prayer_sentence
              </div>
            </div>

            {/* Name + Location on the same line */}
            <div style={styles.twoColumnGrid}>
              <div>
                <label style={commonStyles.label}>Full name</label>
                <input
                  type="text"
                  value={row?.full_name ?? ""}
                  onChange={(e) => updateField(i, "full_name", e.target.value)}
                  placeholder="Full name"
                  style={commonStyles.textInput}
                />
              </div>

              <div>
                <label style={commonStyles.label}>Location</label>
                <input
                  type="text"
                  value={row?.location ?? ""}
                  onChange={(e) => updateField(i, "location", e.target.value)}
                  placeholder="Location"
                  style={commonStyles.textInput}
                />
              </div>
            </div>

            {/* Inquiry */}
            <div style={styles.fieldContainer}>
              <label style={commonStyles.label}>Inquiry</label>
              <textarea
                value={row?.inquiry ?? ""}
                onChange={(e) => updateField(i, "inquiry", e.target.value)}
                placeholder="Write the inquiry…"
                rows={4}
                style={commonStyles.textarea}
              />
            </div>

            {/* Note */}
            <div style={styles.fieldContainer}>
              <label style={commonStyles.label}>Note</label>
              <textarea
                value={row?.note ?? ""}
                onChange={(e) => updateField(i, "note", e.target.value)}
                placeholder="Write the guidance/note…"
                rows={4}
                style={commonStyles.textarea}
              />
            </div>

            {/* Prayer sentence */}
            <div style={styles.fieldContainer}>
              <label style={commonStyles.label}>Prayer sentence</label>
              <textarea
                value={row?.prayer_sentence ?? ""}
                onChange={(e) =>
                  updateField(i, "prayer_sentence", e.target.value)
                }
                placeholder="Write the prayer sentence…"
                rows={3}
                style={commonStyles.textarea}
              />
            </div>

            {/* Render any other fields present in the JSON */}
            {extraKeys.length > 0 && (
              <div style={styles.extraFieldsContainer}>
                <div style={styles.extraFieldsTitle}>Other fields</div>
                <div style={styles.extraFieldsGrid}>
                  {extraKeys.map((k) => (
                    <div key={k}>
                      <label style={styles.extraFieldLabel}>{k}</label>
                      <input
                        type="text"
                        value={row?.[k] ?? ""}
                        onChange={(e) => updateField(i, k, e.target.value)}
                        placeholder={k}
                        style={styles.extraFieldInput}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
