import { Injectable } from "@angular/core";

@Injectable()
export class HttpQueryBuilder {

  private _page: number;

  private _limit: number;

  private _filters: Filter[] = [];

  private _includes: string[] = [];

  page(page: number) {
    this._page = page;
    return this;
  }

  limit(limit: number) {
    this._limit = limit;
    return this;
  }

  addFilter(key: string, value: string) {
    const index = this._filters.findIndex(f => f.key == key);
    if (-1 === index) this._filters.push({key: key, value: value});
    return this;
  }

  removeFilter(key: string) {
    const index = this._filters.findIndex(filter => filter.key == key);
    this._filters.splice(index, 1);
  }

  addInclude(include: string) {
    const index = this._includes.findIndex(i => i == include);
    if (-1 === index) this._includes.push(include);
    return this;
  }

  removeInclude(include: string) {
    const index = this._includes.findIndex(i => i == include);
    if (-1 !== index) this._includes.splice(index, 1);
    return this;
  }

  getParams(): object {
    const params = {};

    if (this._page) {
      params[`page`] = this._page;
    }

    if (this._limit) {
      params[`limit`] = this._limit;
    }

    if (this._filters.length > 0) {
      this._filters.map(filter => {
        params[`filter[${filter.key}]`] = filter.value;
      });
    }

    if (this._includes.length > 0) {
      params[`includes`] = this._includes.join(',');
    }

    return params;
  }

}

interface Filter {
  key: string;
  value: string;
}
