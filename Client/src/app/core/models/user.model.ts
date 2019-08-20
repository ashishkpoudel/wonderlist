export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  api_token: string;

  static fromJson(data: any) {
    const user = new User();
    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.api_token = data.api_token;
    return user;
  }
}
