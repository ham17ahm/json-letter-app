// components/EditorTable.jsx
const REQUIRED_KEYS = [
  "full_name",
  "location",
  "inquiry",
  "note",
  "prayer_sentence",
];

export default function EditorTable({ records, columns, onChange }) {
  // keep the same props; "columns" is ignored now
  function updateField(rowIndex, key, value) {
    onChange((prev) => {
      const next = [...prev];
      next[rowIndex] = { ...next[rowIndex], [key]: value };
      return next;
    });
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {records.map((row, i) => {
        // Any extra keys beyond the required ones will also be rendered at the end
        const extraKeys = Object.keys(row || {}).filter(
          (k) => !REQUIRED_KEYS.includes(k)
        );

        return (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              background: "#fafafa",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div style={{ fontWeight: 600 }}>Record #{i + 1}</div>
              <div style={{ marginLeft: "auto", fontSize: 12, color: "#666" }}>
                Required: full_name, location, inquiry, note, prayer_sentence
              </div>
            </div>

            {/* Name + Location on the same line */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "#444",
                    marginBottom: 6,
                  }}
                >
                  Full name
                </label>
                <input
                  type="text"
                  value={row?.full_name ?? ""}
                  onChange={(e) => updateField(i, "full_name", e.target.value)}
                  placeholder="Full name"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: 10,
                    padding: "12px 14px",
                    height: 44,
                    fontSize: 16,
                    background: "#fff",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "#444",
                    marginBottom: 6,
                  }}
                >
                  Location
                </label>
                <input
                  type="text"
                  value={row?.location ?? ""}
                  onChange={(e) => updateField(i, "location", e.target.value)}
                  placeholder="Location"
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: 10,
                    padding: "12px 14px",
                    height: 44,
                    fontSize: 16,
                    background: "#fff",
                  }}
                />
              </div>
            </div>

            {/* Inquiry */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#444",
                  marginBottom: 6,
                }}
              >
                Inquiry
              </label>
              <textarea
                value={row?.inquiry ?? ""}
                onChange={(e) => updateField(i, "inquiry", e.target.value)}
                placeholder="Write the inquiry…"
                rows={4}
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontSize: 15,
                  lineHeight: 1.4,
                  resize: "vertical",
                  background: "#fff",
                }}
              />
            </div>

            {/* Note */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#444",
                  marginBottom: 6,
                }}
              >
                Note
              </label>
              <textarea
                value={row?.note ?? ""}
                onChange={(e) => updateField(i, "note", e.target.value)}
                placeholder="Write the guidance/note…"
                rows={4}
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontSize: 15,
                  lineHeight: 1.4,
                  resize: "vertical",
                  background: "#fff",
                }}
              />
            </div>

            {/* Prayer sentence */}
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "#444",
                  marginBottom: 6,
                }}
              >
                Prayer sentence
              </label>
              <textarea
                value={row?.prayer_sentence ?? ""}
                onChange={(e) =>
                  updateField(i, "prayer_sentence", e.target.value)
                }
                placeholder="Write the prayer sentence…"
                rows={3}
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontSize: 15,
                  lineHeight: 1.4,
                  resize: "vertical",
                  background: "#fff",
                }}
              />
            </div>

            {/* Render any other fields present in the JSON */}
            {extraKeys.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 6 }}>
                  Other fields
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {extraKeys.map((k) => (
                    <div key={k}>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          color: "#555",
                          marginBottom: 4,
                        }}
                      >
                        {k}
                      </label>
                      <input
                        type="text"
                        value={row?.[k] ?? ""}
                        onChange={(e) => updateField(i, k, e.target.value)}
                        placeholder={k}
                        style={{
                          width: "100%",
                          border: "1px solid #ccc",
                          borderRadius: 8,
                          padding: "10px 12px",
                          height: 40,
                          fontSize: 14,
                          background: "#fff",
                        }}
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
