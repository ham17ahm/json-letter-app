// components/QuickPhraseButtons.jsx
import { QUICK_PHRASES } from "../lib/quickPhrases";
import { colors, radius, spacing } from "../lib/styles";

/**
 * Renders quick phrase buttons for a specific textarea
 * @param {string} fieldName - The field name (e.g., 'inquiry', 'prayer_sentence')
 * @param {function} onPhraseClick - Callback when a phrase button is clicked: (text) => void
 * @param {boolean} isVisible - Whether buttons should be visible
 */
export default function QuickPhraseButtons({
  fieldName,
  onPhraseClick,
  isVisible,
}) {
  // Get phrases for this specific field
  const phrases = QUICK_PHRASES[fieldName] || [];

  // Don't render anything if no phrases configured or not visible
  if (!isVisible || phrases.length === 0) {
    return null;
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: spacing.sm,
      marginLeft: spacing.md,
    },
    button: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: "12px",
      backgroundColor: colors.white,
      border: `1px solid ${colors.gray400}`,
      borderRadius: radius.sm,
      cursor: "pointer",
      transition: "all 0.2s ease",
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    buttonHover: {
      backgroundColor: colors.gray100,
      borderColor: colors.gray500,
    },
  };

  return (
    <div style={styles.container}>
      {phrases.map((phrase, index) => (
        <button
          key={index}
          onMouseDown={(e) => {
            e.preventDefault(); // Prevents textarea from losing focus
            onPhraseClick(phrase.text);
          }}
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor;
            e.currentTarget.style.borderColor = styles.buttonHover.borderColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor;
            e.currentTarget.style.borderColor =
              styles.button.border.split(" ")[1];
          }}
          type="button"
        >
          {phrase.label}
        </button>
      ))}
    </div>
  );
}
