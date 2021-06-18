export default interface DatabaseHealthIndicator {
  pingCheck: () => { up: { status: string } }
}
