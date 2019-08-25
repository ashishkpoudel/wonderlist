export class HttpQueryParamsBuilder {

  page: number;

  limit: number;

  filters: {key: string, value: string}[];

  includes: string[];

  get prop() {
    return 'wow';
  }

  setPage(page: number) {
    this.page = page;
    return this;
  }

  setLimit(limit: number) {
    this.limit = limit;
    return this;
  }

  setFilter(key: string, value: string) {
    this.filters.push({key: key, value: value});
    return this;
  }

  addInclude(include: string) {
    const index = this.includes.findIndex(i => include == i);
    if (-1 === index) this.includes.push(include);
    return this;
  }

  removeInclude(include: string) {
    const index = this.includes.findIndex(i => include == i);
    if (-1 !== index) this.includes.splice(index, 1);
    return this;
  }

  getQueryParamsObject(): object {
    const queryParams = {};

    if (this.page) {
      queryParams[`page`] = this.page;
    }

    if (this.limit) {
      queryParams[`limit`] = this.limit;
    }

    if (this.filters.length > 0) {
      this.filters.map(filter => {
        queryParams[`filter[${filter.key}]`] = filter.value;
      });
    }

    if (this.includes.length > 0) {
      queryParams[`includes`] = this.includes.join(',');
    }

    return queryParams;
  }

}
