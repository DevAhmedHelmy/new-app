export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpiratDate: Date
  ) {
    this.email = email;
    this.id = id;
    this._token = _token;
    this._tokenExpiratDate = _tokenExpiratDate;
  }
  /**
   * return token : string
   */
  get token() {
    if (!this._tokenExpiratDate || new Date() > this._tokenExpiratDate) {
      return null;
    }
    return this._token;
  }
}
