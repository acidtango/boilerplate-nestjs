export default interface DomainService<T, U> {
  execute(params?: T): Promise<U> | U
}
