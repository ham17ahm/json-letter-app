"use client";

import { useState, useMemo } from "react";
import EditorTable from "../components/EditorTable";
import { openPrintPreview } from "../lib/print";
import { REQUIRED_KEYS, validateArrayOfObjects } from "../lib/validation";
import JsonInput from "../components/JsonInput";

export default function Home() {
  const [text, setText] = useState(`[
  {
    "full_name": "Rana Waseem Ahmad",
    "location": "London, UK",
    "inquiry": "I have received your letter inquiring whether listening to Qawwali is permissible in Islam.",
    "note": "You may listen to meaningful Qawallis.",
    "prayer_sentence": "May Allah Ta'ala grant you success in your studies and bless you with the wisdom to distinguish between right and wrong. Amin"
  }
]`);

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

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 8 }}>JSON → Letter (Step 6)</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        Paste your JSON, click <strong>Process</strong>, edit in the table, then{" "}
        <strong>Print Preview</strong>.
      </p>

      {/* JSON input */}
      <JsonInput value={text} onChange={setText} />

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <span
          style={{ fontSize: 14, color: validation.ok ? "green" : "#b60000" }}
        >
          {validation.message}
        </span>
        <button
          onClick={onProcess}
          disabled={!validation.ok}
          style={{
            marginLeft: "auto",
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: validation.ok ? "#111" : "#888",
            color: "#fff",
            cursor: validation.ok ? "pointer" : "not-allowed",
          }}
        >
          Process
        </button>
      </div>

      {/* Editable table + Print */}
      {records.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 14, color: "#444" }}>
              {records.length} record(s)
            </span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                onClick={() => openPrintPreview(records)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  background: "#111",
                  color: "#fff",
                }}
                title="Open print preview in a new tab"
              >
                Print Preview
              </button>
              <button
                onClick={() => setRecords([])}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  background: "#f8f8f8",
                }}
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

          <p style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
            Tip: Print Preview uses what you see in the table right now.
          </p>
        </section>
      )}
    </main>
  );
}
