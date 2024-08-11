export const Role = {
  ADMIN: "ADMIN",
  SPEAKER: "SPEAKER",
  ORGANIZER: "ORGANIZER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
