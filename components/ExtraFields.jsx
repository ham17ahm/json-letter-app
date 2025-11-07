// components/ExtraFields.jsx
import { colors, spacing, typography, commonStyles } from "../lib/styles";

/**
 * Renders any extra fields that exist beyond the required ones
 * @param {array} extraKeys - Array of extra field keys to render
 * @param {object} record - The record data
 * @param {function} onUpdate - Callback to update a field: (key, value) => void
 */
export default function ExtraFields({ extraKeys, record, onUpdate }) {
  // If no extra keys, don't render anything
  if (!extraKeys || extraKeys.length === 0) {
    return null;
  }

  const styles = {
    container: {
      marginTop: spacing.sm,
    },
    title: {
      fontSize: typography.sizes.sm,
      color: colors.gray600,
      marginBottom: 6,
    },
    grid: {
      display: "grid",
      gap: 10,
    },
    label: {
      display: "block",
      fontSize: typography.sizes.xs,
      color: colors.gray700,
      marginBottom: 4,
    },
    input: {
      ...commonStyles.textInput,
      height: 40,
      fontSize: typography.sizes.base,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Other fields</div>
      <div style={styles.grid}>
        {extraKeys.map((key) => (
          <div key={key}>
            <label style={styles.label}>{key}</label>
            <input
              type="text"
              value={record?.[key] ?? ""}
              onChange={(e) => onUpdate(key, e.target.value)}
              placeholder={key}
              style={styles.input}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
