export const Role = {
  ADMIN: 'ADMIN',
  SPEAKER: 'SPEAKER',
  ORGANIZER: 'ORGANIZER',
}

export type Role = (typeof Role)[keyof typeof Role]
