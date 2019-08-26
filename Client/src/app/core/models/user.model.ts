export class User {
  id: number;
  name: string;
  email: string;
  api_token: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.api_token = data.api_token;
  }
}
