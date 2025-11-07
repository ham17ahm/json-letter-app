// components/CardHeader.jsx
import { colors, spacing, typography } from "../lib/styles";

/**
 * Header for each record card showing record number and required fields
 * @param {number} recordNumber - The record number to display (1-indexed)
 */
export default function CardHeader({ recordNumber }) {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      marginBottom: spacing.md,
    },
    title: {
      fontWeight: 600,
    },
    subtitle: {
      marginLeft: "auto",
      fontSize: typography.sizes.xs,
      color: colors.gray600,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Record #{recordNumber}</div>
      <div style={styles.subtitle}>
        Required: full_name, location, inquiry, note, prayer_sentence
      </div>
    </div>
  );
}
