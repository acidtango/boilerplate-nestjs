export class LoginSpeakerResponseDTO {
  public readonly accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }
}
