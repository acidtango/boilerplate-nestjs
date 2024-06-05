import { OrganizerId } from './OrganizerId'
import { CESAR } from '../../../infrastructure/fixtures/organizers'
import { PAOLA } from '../../../infrastructure/fixtures/speakers'

describe('OrganizerId', () => {
  it('same ids can be compared', () => {
    const first = OrganizerId.fromPrimitives(CESAR.id)
    const second = OrganizerId.fromPrimitives(CESAR.id)

    expect(first.equals(second)).toBe(true)
  })

  it('different ids can be compared', () => {
    const first = OrganizerId.fromPrimitives(CESAR.id)
    const second = OrganizerId.fromPrimitives(PAOLA.id)

    expect(first.equals(second)).toBe(false)
  })
})
