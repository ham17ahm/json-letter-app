// lib/print.js

// --- helpers ---
function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toDDMMYYYY(d) {
  const date = d instanceof Date ? d : new Date(d ?? Date.now());
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

// Hide note when it's "N/A", "Dua", empty, or whitespace-only
function shouldHideNote(value) {
  const v = String(value ?? "")
    .trim()
    .toLowerCase();
  return v === "" || v === "n/a" || v === "dua";
}

// Allow raw HTML for mainContent like EJS `<%- ... %>`;
// for everything else we escape.
function getLetterModel(item) {
  return {
    prefixName: item.prefixName ?? "Dear ",
    fullName: item.fullName ?? item.full_name ?? "",
    letterDisplayDate: item.letterDisplayDate ?? new Date(),
    headerLocation: "Islamabad, UK",

    preContent: item.preContent ?? item.inquiry ?? "",
    note: item.note ?? "",

    // if you don't provide mainContent, it will render the prayer sentence as plain text
    mainContent:
      item.mainContent ??
      (item.prayer_sentence
        ? `<p>${escapeHTML(item.prayer_sentence)}</p>`
        : ""),

    footnote: item.footnote ?? "",

    // ⬇️ NEW: recipient’s location (used at bottom)
    recipientLocation: item.recipientLocation ?? item.location ?? "",
  };
}

function letterHTML(item, index) {
  const m = getLetterModel(item);

  const dateStr = `HM – ${toDDMMYYYY(m.letterDisplayDate)}`;
  const prefixNameEsc = escapeHTML(m.prefixName);
  const fullNameEsc = escapeHTML(m.fullName);
  const preContentEsc = escapeHTML(m.preContent);
  const noteEsc = escapeHTML(m.note);
  const footnoteEsc = escapeHTML(m.footnote);

  // If note is N/A/Dua/empty, render nothing for .note_text
  const noteHtml = shouldHideNote(m.note) ? "" : noteEsc;

  return `
  <div class="letter-container" aria-label="Letter ${index + 1}">
    <div class="letter-content">
      <div class="date_location_combined">
        <div class="date_location">${escapeHTML(m.headerLocation)}</div>
        <div class="date">${dateStr}</div>
      </div>

      <div class="title_fullname text">
        <div class="title text">${prefixNameEsc}</div>
        <div class="full_name text">${fullNameEsc},</div>
      </div>

      <div class="salam">اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُه</div>

      <div class="intro_text text">${preContentEsc}</div>

      <div class="note_text text">${noteHtml}</div>

      <div class="main_text text" style="line-height: 1.2">
        ${m.mainContent /* raw HTML on purpose, like <%- ... %> */}
      </div>

      <div class="wassalam">Wassalam</div>
      <div class="greeting_end">Yours sincerely,</div>
      <div class="signature">MIRZA MASROOR AHMAD</div>
      <div class="signature_title">Khalifatul-Masih V</div>
    </div>

    <div class="footnote-container">
    <div class="footnote-text">${footnoteEsc}</div>
    ${
      m.recipientLocation
        ? `<div class="footer-location">${escapeHTML(
            m.recipientLocation
          )}</div>`
        : ""
    }
    </div>
  </div>
  `;
}

export function openPrintPreview(data) {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Popup blocked. Please allow popups to view/print letters.");
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Letters — Print Preview</title>

<style>
/* ======= Your print.css (inlined) ======= */

/* Fonts */
@font-face {
  font-family: Khat_Manzoor;
  src: url("/fonts/_Khat_Manzoor.ttf"); /* Put the file under /public/fonts/_Khat_Manzoor.ttf */
}

/* Regular and print styles combined */
body {
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

/* General text */
p {
  margin-top: 2mm;
  margin-bottom: 2mm;
}

.text {
  font-size: 15pt;
}

/* Letter container */
.letter-container {
  position: relative;
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  margin: 20px auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  page-break-after: always;
  border: 1px solid #ddd;
  overflow: hidden;
}

/* Letter content */
.letter-content {
  padding: 7cm 3.75cm 2.5cm 4cm; /* Top Right Bottom Left */
}

/* Date and location */
.date_location_combined {
  text-align: right;
  font-size: 10pt;
}

.date {
  text-decoration: overline;
}

/* Title and full name */
.title_fullname {
  margin-top: 3mm;
  margin-bottom: 2mm;
}

.title,
.full_name {
  display: inline-block;
}

/* Salam */
.salam {
  text-align: center;
  font-family: Khat_Manzoor, Arial, sans-serif;
  font-size: 18pt;
}

/* Intro text */
.intro_text {
  margin-bottom: 2mm;
}

/* Main text */
.main_text,
.note_text,
.intro_text {
  text-align: justify;
}

/* Wassalam and greeting end */
.wassalam {
  font-style: italic;
  margin-top: 2mm;
  font-size: 15pt;
}

.greeting_end {
  margin-top: 2mm;
  font-size: 15pt;
}

/* Signature */
.signature {
  margin-top: 18mm;
  font-weight: bold;
  font-size: 16pt;
}

.signature_title {
  font-style: italic;
  font-size: 14pt;
  margin: 0;
  position: relative;
}

/* Footnote */
.footnote-container {
  position: absolute;
  bottom: 2.5cm;
  left: 4cm;
  right: 3.75cm;
  font-size: 10pt;
  white-space: pre-wrap;
}

.footer-location { text-align: left; font-size: 10pt; }


/* Print-specific styles */
@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  body {
    background-color: white;
  }

  .letter-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    box-shadow: none;
    border: none;
    page-break-after: always;
    break-after: page;
    position: relative;
  }

  .letter-content {
    padding: 7cm 3.75cm 2.5cm 4cm;
  }

  /* Hide UI elements when printing */
  button,
  input,
  select,
  .no-print {
    display: none !important;
  }
}

/* Small toolbar (hidden on print) */
.toolbar {
  position: sticky;
  top: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f3f3f3;
  border-bottom: 1px solid #ddd;
}
.toolbar button {
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
}
@media print {
  .toolbar { display: none !important; }
}
</style>
</head>

<body>
  <div class="toolbar no-print">
    <div style="font: 12px/1.4 system-ui, sans-serif; color: #444"><strong>${
      data.length
    }</strong> letter(s)</div>
    <div>
      <button onclick="window.print()">Print</button>
      <button onclick="window.close()">Close</button>
    </div>
  </div>

  ${data.map(letterHTML).join("")}

</body>
</html>`;

  w.document.open();
  w.document.write(html);
  w.document.close();
}
