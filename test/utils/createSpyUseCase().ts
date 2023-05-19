export function createSpyUseCase<U, T extends {}>({ mockReturn }: { mockReturn?: any } = {}): T {
  return { execute: jest.fn().mockReturnValue(mockReturn) } as unknown as T
}
