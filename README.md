# JSON Letter App

This is a small Next.js app for turning JSON records into printable letters.
It is designed as a local, client-side document-production tool:

1. Paste a JSON array of letter records.
2. Validate that each record has the required fields.
3. Process the JSON into editable record cards.
4. Make any manual edits.
5. Open a print preview that renders one A4 letter per record.

There is no backend, database, authentication, or persistence layer. The working
state lives in the browser while the page is open.

## Workflows

The cover page at `/` lets the user choose between two workflows:

- `/hz` - the unmodified HZ version.
- `/ps` - the PS amendments version.

Both workflows follow the same UI pattern, but they use different validation
rules and print templates.

## Data Model

The HZ workflow uses the shared required keys from `lib/constants.js`:

```js
[
  "full_name",
  "location",
  "inquiry",
  "note",
  "prayer_sentence",
]
```

The PS workflow has its own validation in `app/ps/validation.js` and excludes
`note`:

```js
[
  "full_name",
  "location",
  "inquiry",
  "prayer_sentence",
]
```

Extra keys in incoming JSON are not discarded. They are displayed and editable
through the `ExtraFields` component.

## Main Architecture

- `app/page.js` - cover page with links to `/hz` and `/ps`.
- `app/hz/page.js` - main HZ JSON/edit/print workflow.
- `app/ps/page.js` - PS JSON/edit/print workflow.
- `lib/constants.js` - shared HZ schema and app config.
- `lib/validation.js` - shared HZ validation.
- `app/ps/validation.js` - PS-specific validation.
- `lib/print.js` - HZ print-preview HTML template.
- `app/ps/print.js` - PS print-preview HTML template.
- `components/` - shared editor UI components.
- `app/ps/` - PS-specific forks for components/templates that diverge from HZ.

The editor component tree is:

```text
EditorTable
  RecordCard
    CardHeader
    TwoColumnFields
      TextField
    TextAreaField
      QuickPhraseButtons
    ExtraFields
```

Despite the name, `EditorTable` currently renders a list of editable cards,
not a table.

## Design Principles

- The pasted JSON is the initial source of truth.
- After clicking `Process`, the parsed `records` state becomes the editable
  working copy.
- Validation is strict about required keys but permissive about additional
  fields.
- Print output is generated as a complete HTML document string and written into
  a popup window with `window.open`.
- Most letter fields are HTML-escaped before printing.
- `mainContent` is intentionally allowed to contain raw HTML so advanced letter
  body formatting can be passed through. Treat that input as trusted.
- Styling is intentionally simple: mostly inline style objects plus shared
  style constants in `lib/styles.js`.
- PS behavior currently diverges by copied route-specific files rather than by
  a central configuration system.

## Known Maintenance Notes

- Some user-facing strings and Arabic/Urdu text appear mojibaked in source
  files. This likely came from an encoding mismatch and should be fixed before
  editing those templates heavily.
- The default Next.js README content has been replaced, but metadata in
  `app/layout.js` still says `Create Next App`.
- `package.json` runs the dev server on port `5010`, not the default `3000`.
- The `columns` values computed in the page files are currently passed to
  `EditorTable` but not used.
- The HZ and PS routes duplicate a meaningful amount of workflow code. This is
  simple and explicit, but shared workflow changes need to be applied carefully
  to both routes when appropriate.

## Development

Install dependencies if needed:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app starts on:

```text
http://localhost:5010
```

Other scripts:

```bash
npm run build
npm run lint
```
