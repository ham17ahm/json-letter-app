// lib/validation.js
export const REQUIRED_KEYS = [
  "full_name",
  "location",
  "inquiry",
  "note",
  "prayer_sentence",
];

export function validateArrayOfObjects(data) {
  if (!Array.isArray(data)) {
    return { ok: false, message: "Top level must be an array." };
  }
  if (data.length === 0) {
    return { ok: false, message: "Array is empty." };
  }

  const missingByIndex = [];
  data.forEach((row, i) => {
    if (typeof row !== "object" || row === null) {
      missingByIndex.push(`#${i + 1}: not an object`);
      return;
    }
    const missing = REQUIRED_KEYS.filter((k) => !(k in row));
    if (missing.length) {
      missingByIndex.push(`#${i + 1}: ${missing.join(", ")}`);
    }
  });

  if (missingByIndex.length) {
    return {
      ok: false,
      message: `Some rows have missing fields → ${missingByIndex
        .slice(0, 3)
        .join(" • ")}${missingByIndex.length > 3 ? " …" : ""}`,
    };
  }

  return { ok: true, message: "Valid JSON array with required fields." };
}
