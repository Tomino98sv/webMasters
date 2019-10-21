export class User {
  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password: string = ''
  ) {}

  getSkLastLogin(): string {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeStyle: 'long',
      hour: '2-digit',
      minute: '2-digit'
    };
    return this.lastLogin
      ? this.lastLogin.toLocaleTimeString('sk-SK', options)
      : 'nikdy';
  }
}
