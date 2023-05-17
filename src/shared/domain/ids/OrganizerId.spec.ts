import { OrganizerId } from './OrganizerId'
import { FRAN } from '../../fixtures/organizers'
import { JOYCE_LIN } from '../../fixtures/speakers'

describe('OrganizerId', () => {
  it('same ids can be compared', () => {
    const first = OrganizerId.fromPrimitives(FRAN.id)
    const second = OrganizerId.fromPrimitives(FRAN.id)

    expect(first.equals(second)).toBe(true)
  })

  it('different ids can be compared', () => {
    const first = OrganizerId.fromPrimitives(FRAN.id)
    const second = OrganizerId.fromPrimitives(JOYCE_LIN.id)

    expect(first.equals(second)).toBe(false)
  })
})
