import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Entry, Tag, Pagination } from '../models';

@Injectable()
export class EntryService {

  constructor(
    private apiService: ApiService
  ) {}

  getAll(params = {}): Observable<{entries: Entry[], pagination: Pagination}> {
    return this.apiService.get('/entries', params).pipe(
      map(response => {
        return {
          entries: response.data.map(post => Entry.fromJson(post)),
          pagination: new Pagination(response),
        }
      })
    );
  }

  get(id: number|string): Observable<Entry> {
    return this.apiService.get(`/entries/${id}`).pipe(
      map(response => {
        return Entry.fromJson(response.data);
      })
    );
  }

  save(data: object = {}): Observable<Entry> {
    return this.apiService.post(`/entries`, data).pipe(
      map(response => {
        return Entry.fromJson(response.data);
      })
    );
  }

  update(id: number|string, data: object = {}): Observable<Entry> {
    return this.apiService.patch(`/entries/${id}`, data).pipe(
      map(response => {
        return Entry.fromJson(response.data);
      })
    );
  }

  delete(id: number|string): Observable<any> {
    return this.apiService.delete(`/entries/${id}`);
  }

  restore(id: number|string): Observable<any> {
    return this.apiService.put(`/entries/${id}/restore`, {});
  }

  attachTag(id: number|string, tag: Tag): Observable<any> {
    return this.apiService.post(`/entries/${id}/attach-tag/${tag.id}`, {});
  }
}
