// lib/constants.js
// Centralized constants for the application

/**
 * Required fields for each letter record
 */
export const REQUIRED_KEYS = [
  "full_name",
  "location",
  "inquiry",
  "note",
  "prayer_sentence",
];

/**
 * Field labels for display purposes
 */
export const FIELD_LABELS = {
  full_name: "Full Name",
  location: "Location",
  inquiry: "Inquiry",
  note: "Note",
  prayer_sentence: "Prayer Sentence",
};

/**
 * Application metadata
 */
export const APP_CONFIG = {
  title: "JSON → Letter Generator",
  maxWidth: 1000,
  defaultJsonExample: `[
  {
    "full_name": "Rana Waseem Ahmad",
    "location": "London, UK",
    "inquiry": "I have received your letter inquiring whether listening to Qawwali is permissible in Islam.",
    "note": "You may listen to meaningful Qawallis.",
    "prayer_sentence": "May Allah Ta'ala grant you success in your studies and bless you with the wisdom to distinguish between right and wrong. Amin"
  }
]`,
};
