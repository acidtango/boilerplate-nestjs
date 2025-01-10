export const Language = {
  SPANISH: 'SPANISH',
  ENGLISH: 'ENGLISH',
}

export type Language = (typeof Language)[keyof typeof Language]
