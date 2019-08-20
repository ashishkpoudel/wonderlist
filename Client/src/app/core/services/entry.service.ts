import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Entry } from '../models';

@Injectable()
export class EntryService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Entry[]> {
    return this.apiService.get('/entries').pipe(
      map(response => {
        return response.data.map(post => Entry.fromJson(post));
      })
    );
  }

  update(entry: Entry, data: object = {}): Observable<Entry> {
    return this.apiService.patch(`/entries/${entry.id}`, data).pipe(
      map(response => {
        return Entry.fromJson(response.data);
      })
    );
  }

  delete(entry: Entry) {
    return this.apiService.delete(`/entries/${entry.id}`);
  }
}
