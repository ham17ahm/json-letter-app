"use client";

import { colors, spacing, typography } from "../../lib/styles";

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
        Required: full_name, location, inquiry, prayer_sentence
      </div>
    </div>
  );
}
