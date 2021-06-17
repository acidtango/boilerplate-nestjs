import DomainErrorCode from '../../domain/errors/domain-error-code.domain'

// Please, maintain this enum alphabetically ordered
const domainErrorToHttpStatusCode: Record<DomainErrorCode, number> = {}

export default domainErrorToHttpStatusCode
