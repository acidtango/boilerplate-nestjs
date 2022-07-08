export const MICHAEL_CONTACT = {
  name: 'Michael',
  phone: '+34681738471',
}

export const OLIVER_CONTACT = {
  name: 'Oliver',
  phone: '+34648957841',
}

export const JANE_CONTACT = {
  name: 'Jane',
  phone: '+34648571831',
}

export const STUART_CONTACT = {
  name: 'Stuart',
  phone: '+34648571899',
}

export const MICHAEL = {
  uuid: 'dc835ae2-4399-46fd-a5fb-080f0ca793e1',
  name: MICHAEL_CONTACT.name,
  lastName: 'Phelps',
  phone: MICHAEL_CONTACT.phone,
  contacts: [JANE_CONTACT, OLIVER_CONTACT],
}

export const OLIVER = {
  name: OLIVER_CONTACT.name,
  lastName: 'Atom',
  phone: OLIVER_CONTACT.phone,
  contacts: [MICHAEL_CONTACT],
}

export const JANE = {
  name: JANE_CONTACT.name,
  lastName: 'Atom',
  phone: JANE_CONTACT.phone,
  contacts: [],
}

export const STUART = {
  name: STUART_CONTACT.name,
  lastName: 'Sukoshi',
  phone: STUART_CONTACT.phone,
  contacts: [],
}

export const UNKNOWN = {
  id: '12d2f779-3986-48be-8b55-9398197c64c2',
}

export function contactToPrimitives({ name, phone }: typeof MICHAEL_CONTACT) {
  return {
    name,
    phone,
  }
}
