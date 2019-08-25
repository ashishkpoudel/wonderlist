import { User } from './user.model';

export class Entry {
  id: number;
  user?: User;
  title: string;
  slug: string;
  body: string;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.body = data.body;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;

    if (data.user) {
      this.user = User.fromJson(data.user);
    }
  }

}
