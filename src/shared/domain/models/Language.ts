export const Language = {
  SPANISH: "SPANISH",
  ENGLISH: "ENGLISH",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
