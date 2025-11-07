"use client";

import { useState, useMemo } from "react";
import EditorTable from "../components/EditorTable";
import { openPrintPreview } from "../lib/print";
import { validateArrayOfObjects } from "../lib/validation";
import { REQUIRED_KEYS, APP_CONFIG } from "../lib/constants";
import {
  colors,
  radius,
  spacing,
  typography,
  commonStyles,
} from "../lib/styles";
import JsonInput from "../components/JsonInput";

export default function Home() {
  const [text, setText] = useState(APP_CONFIG.defaultJsonExample);
  const [records, setRecords] = useState([]);

  const validation = useMemo(() => {
    try {
      const data = JSON.parse(text);
      return validateArrayOfObjects(data);
    } catch (e) {
      return { ok: false, message: "Invalid JSON: " + e.message };
    }
  }, [text]);

  function onProcess() {
    const data = JSON.parse(text);
    setRecords(data);
  }

  const columns = useMemo(() => {
    const extras = new Set();
    records.forEach((r) =>
      Object.keys(r || {}).forEach((k) => {
        if (!REQUIRED_KEYS.includes(k)) extras.add(k);
      })
    );
    return [...REQUIRED_KEYS, ...Array.from(extras)];
  }, [records]);

  // Page-specific styles
  const styles = {
    main: {
      maxWidth: APP_CONFIG.maxWidth,
      margin: "40px auto",
      padding: "0 16px",
      fontFamily: typography.fontFamily,
    },
    title: {
      marginBottom: spacing.sm,
    },
    subtitle: {
      color: colors.gray600,
      marginTop: 0,
    },
    validationRow: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginTop: spacing.md,
    },
    validationMessage: (isValid) => ({
      fontSize: typography.sizes.base,
      color: isValid ? colors.success : colors.error,
    }),
    processButton: (isValid) => ({
      marginLeft: "auto",
      padding: "10px 14px",
      borderRadius: radius.sm,
      border: `1px solid ${colors.gray500}`,
      background: isValid ? colors.black : colors.disabled,
      color: colors.white,
      cursor: isValid ? "pointer" : "not-allowed",
      fontWeight: 600,
    }),
    resultsSection: {
      marginTop: spacing.xl,
    },
    resultsHeader: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: spacing.sm,
    },
    recordCount: {
      fontSize: typography.sizes.base,
      color: colors.gray800,
    },
    buttonGroup: {
      marginLeft: "auto",
      display: "flex",
      gap: spacing.sm,
    },
    printButton: {
      ...commonStyles.buttonPrimary,
    },
    clearButton: {
      ...commonStyles.buttonSecondary,
    },
    tip: {
      fontSize: typography.sizes.xs,
      color: colors.gray600,
      marginTop: spacing.sm,
    },
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>{APP_CONFIG.title}</h1>
      <p style={styles.subtitle}>
        Paste your JSON, click <strong>Process</strong>, edit in the table, then{" "}
        <strong>Print Preview</strong>.
      </p>

      {/* JSON input */}
      <JsonInput value={text} onChange={setText} />

      <div style={styles.validationRow}>
        <span style={styles.validationMessage(validation.ok)}>
          {validation.message}
        </span>
        <button
          onClick={onProcess}
          disabled={!validation.ok}
          style={styles.processButton(validation.ok)}
        >
          Process
        </button>
      </div>

      {/* Editable table + Print */}
      {records.length > 0 && (
        <section style={styles.resultsSection}>
          <div style={styles.resultsHeader}>
            <span style={styles.recordCount}>{records.length} record(s)</span>
            <div style={styles.buttonGroup}>
              <button
                onClick={() => openPrintPreview(records)}
                style={styles.printButton}
                title="Open print preview in a new tab"
              >
                Print Preview
              </button>
              <button
                onClick={() => setRecords([])}
                style={styles.clearButton}
                title="Hide the table (JSON text remains as-is)"
              >
                Clear Table
              </button>
            </div>
          </div>

          <EditorTable
            records={records}
            columns={columns}
            onChange={setRecords}
          />

          <p style={styles.tip}>
            Tip: Print Preview uses what you see in the table right now.
          </p>
        </section>
      )}
    </main>
  );
}
