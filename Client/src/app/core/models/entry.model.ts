import {User} from './user.model';

export class Entry {
  id: number;
  user?: User;
  title: string;
  slug: string;
  body: string;

  static fromJson(data: any) {
    const entry = new Entry();
    entry.id = data.id;
    entry.title = data.title;
    entry.slug = data.slug;
    entry.body = data.body;

    if (data.user) {
      entry.user = User.fromJson(data.user);
    }

    return entry;
  }
}
