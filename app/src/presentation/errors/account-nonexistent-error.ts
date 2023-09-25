
export class NonexistentAccountError extends Error {
  constructor() {
      super('There is no account with that email')
      this.name = 'EmailInUseError'
  }
}