export class Pagination {

  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;

  constructor(data: any) {
    if (data.meta) {
      this.current_page = data.meta.current_page;
      this.from = data.meta.from;
      this.last_page = data.meta.last_page;
      this.per_page = data.meta.per_page;
      this.to = data.meta.to;
      this.total = data.meta.total;
    }
  }

}
