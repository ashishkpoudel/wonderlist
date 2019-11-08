import { User } from './user.model';
import { Media } from './media.model';
import { Tag } from './tag.model';

export class Entry {
  id: number;
  user?: User;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  trashed: boolean;
  created_at: string;
  updated_at: string;
  media?: Media[] = [];
  tags?: Tag[] = [];

  static fromJson(data: any) {
    const entry = new Entry();
    entry.id = data.id;
    entry.title = data.title;
    entry.slug = data.slug;
    entry.excerpt = data.excerpt;
    entry.body = data.body;
    entry.trashed = data.trashed;
    entry.created_at = data.created_at;
    entry.updated_at = data.updated_at;

    if (data.user) {
      entry.user = new User(data.user);
    }

    if (data.media) {
      data.media.forEach(data => {
        entry.media.push(new Media(data));
      });
    }

    if (data.tags) {
      data.tags.forEach(data => {
        entry.tags.push(new Tag(data));
      });
    }

    return entry;
  }
}
