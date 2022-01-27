import { Contact } from './Contact'
import { UserId } from '../../../shared/domain/ids/UserId'
import { Contacts } from './Contacts'

export const CONTACT_REPOSITORY_TOKEN = 'ContactRepository'

export interface ContactRepository {
  save(contact: Contact): Promise<void>
  findAllOfUser(userId: UserId): Promise<Contacts>
}
