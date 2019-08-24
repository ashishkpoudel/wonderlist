import {User} from './user.model';

export class Entry {
  id: number;
  user?: User;
  title: string;
  slug: string;
  body: string;
  created_at: string;
  updated_at: string;

  static fromJson(data: any) {
    const entry = new Entry();
    entry.id = data.id;
    entry.title = data.title;
    entry.slug = data.slug;
    entry.body = data.body;
    entry.created_at = data.created_at;
    entry.updated_at = data.updated_at;

    if (data.user) {
      entry.user = User.fromJson(data.user);
    }

    return entry;
  }
}
