import Link from "next/link";
import { APP_CONFIG } from "../lib/constants";

export default function CoverPage() {
  const styles = {
    main: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)",
      padding: 24,
    },
    card: {
      background: "#fff",
      borderRadius: 20,
      padding: "52px 48px",
      textAlign: "center",
      maxWidth: 460,
      width: "100%",
      boxShadow:
        "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)",
    },
    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 56,
      height: 56,
      borderRadius: 16,
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      marginBottom: 20,
      fontSize: 24,
    },
    title: {
      margin: "0 0 8px 0",
      fontSize: 24,
      fontWeight: 700,
      color: "#1a1a2e",
      letterSpacing: "-0.3px",
    },
    subtitle: {
      margin: "0 0 36px 0",
      color: "#8b8fa3",
      fontSize: 14,
      fontWeight: 400,
    },
    buttonGroup: {
      display: "flex",
      gap: 14,
    },
    linkCard: (gradient) => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "28px 20px 22px",
      borderRadius: 14,
      background: gradient,
      textDecoration: "none",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "pointer",
      border: "none",
    }),
    linkAbbr: {
      fontSize: 28,
      fontWeight: 700,
      color: "#fff",
      letterSpacing: "1px",
      marginBottom: 8,
    },
    linkLabel: {
      fontSize: 12,
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 500,
    },
    footer: {
      marginTop: 28,
      fontSize: 12,
      color: "#b0b4c4",
      letterSpacing: "0.3px",
    },
  };

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <div style={styles.icon}>
          <span role="img" style={{ color: "#fff", lineHeight: 1 }}>
            ✉
          </span>
        </div>

        <h1 style={styles.title}>{APP_CONFIG.title}</h1>
        <p style={styles.subtitle}>Select a version to open</p>

        <div style={styles.buttonGroup}>
          <Link
            href="/hz"
            style={styles.linkCard(
              "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)"
            )}
          >
            <span style={styles.linkAbbr}>HZ</span>
            <span style={styles.linkLabel}>The unmodified version</span>
          </Link>

          <Link
            href="/ps"
            style={styles.linkCard(
              "linear-gradient(135deg, #4a5568 0%, #636e80 100%)"
            )}
          >
            <span style={styles.linkAbbr}>PS</span>
            <span style={styles.linkLabel}>The version for amendments</span>
          </Link>
        </div>

        <p style={styles.footer}>Choose a workflow to get started</p>
      </div>
    </main>
  );
}
