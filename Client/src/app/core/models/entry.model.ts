import { User } from './user.model';
import { Media } from './media.model';

export class Entry {
  id: number;
  user?: User;
  media?: Media;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  trashed: boolean;
  created_at: string;
  updated_at: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.excerpt = data.excerpt;
    this.body = data.body;
    if (data.user) this.user = new User(data.user);
    if (data.media) this.media = new Media(data.media); console.log(data.media);
    this.trashed = data.trashed;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

}
