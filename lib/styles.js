// lib/styles.js
// Design system and reusable style utilities

/**
 * Color palette
 */
export const colors = {
  // Primary
  black: "#111",
  white: "#fff",

  // Grays
  gray50: "#fafafa",
  gray100: "#f8f8f8",
  gray200: "#f3f3f3",
  gray300: "#ededed",
  gray400: "#ddd",
  gray500: "#ccc",
  gray600: "#666",
  gray700: "#555",
  gray800: "#444",
  gray900: "#171717",

  // Semantic colors
  success: "green",
  error: "#b60000",
  disabled: "#888",
};

/**
 * Spacing scale (in pixels)
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 40,
};

/**
 * Border radius scale
 */
export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
};

/**
 * Typography
 */
export const typography = {
  fontFamily: "system-ui, sans-serif",
  monoFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",

  sizes: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 15,
    lg: 16,
    xl: 18,
  },
};

/**
 * Common reusable style objects
 */
export const commonStyles = {
  // Input base styles
  inputBase: {
    width: "100%",
    border: `1px solid ${colors.gray500}`,
    background: colors.white,
    fontSize: typography.sizes.md,
  },

  // Text input
  textInput: {
    width: "100%",
    border: `1px solid ${colors.gray500}`,
    borderRadius: radius.md,
    padding: "12px 14px",
    height: 44,
    fontSize: typography.sizes.lg,
    background: colors.white,
  },

  // Textarea
  textarea: {
    width: "100%",
    border: `1px solid ${colors.gray500}`,
    borderRadius: radius.md,
    padding: "12px 14px",
    fontSize: typography.sizes.md,
    lineHeight: 1.4,
    resize: "vertical",
    background: colors.white,
  },

  // Label
  label: {
    display: "block",
    fontSize: typography.sizes.sm,
    color: colors.gray800,
    marginBottom: 6,
  },

  // Primary button
  buttonPrimary: {
    padding: "10px 14px",
    borderRadius: radius.sm,
    border: `1px solid ${colors.gray500}`,
    background: colors.black,
    color: colors.white,
    cursor: "pointer",
    fontWeight: 600,
  },

  // Secondary button
  buttonSecondary: {
    padding: "8px 12px",
    borderRadius: radius.sm,
    border: `1px solid ${colors.gray500}`,
    background: colors.gray100,
    cursor: "pointer",
  },

  // Card container
  card: {
    border: `1px solid ${colors.gray400}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    background: colors.gray50,
  },
};

/**
 * Utility function to merge styles
 */
export function mergeStyles(...styles) {
  return Object.assign({}, ...styles);
}
