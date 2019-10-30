export class Media {
  id: number;
  path: string;
  relative_path: string;
  mime_type: string;
  extension: string;
  size: string;
  subject_id: number;
  subject_type: string;
  category: string;

  constructor(data: any) {
    this.id = data.id;
    this.path = data.path;
    this.relative_path = data.relative_path;
    this.mime_type = data.mime_type;
    this.extension = data.extension;
    this.size = data.size;
    this.subject_id = data.subject_id;
    this.subject_type = data.subject_type;
    this.category = data.category;
  }
}
