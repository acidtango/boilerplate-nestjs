export type HealthResult = { up: { status: string } }

export interface DatabaseHealthIndicator {
  pingCheck: () => HealthResult
}
