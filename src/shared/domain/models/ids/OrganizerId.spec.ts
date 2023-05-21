import { OrganizerId } from './OrganizerId'
import { DAILOS } from '../../../infrastructure/fixtures/organizers'
import { CONCHA_ASENSIO } from '../../../infrastructure/fixtures/speakers'

describe('OrganizerId', () => {
  it('same ids can be compared', () => {
    const first = OrganizerId.fromPrimitives(DAILOS.id)
    const second = OrganizerId.fromPrimitives(DAILOS.id)

    expect(first.equals(second)).toBe(true)
  })

  it('different ids can be compared', () => {
    const first = OrganizerId.fromPrimitives(DAILOS.id)
    const second = OrganizerId.fromPrimitives(CONCHA_ASENSIO.id)

    expect(first.equals(second)).toBe(false)
  })
})
