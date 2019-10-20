import { Injectable } from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Tag, Pagination} from "../models";
import {map} from "rxjs/operators";

@Injectable()
export class TagService {

  constructor(
    private apiService: ApiService
  ){}

  getAll(): Observable<{tags: Tag[], pagination: Pagination }> {
    return this.apiService.get(`/tags`).pipe(
      map(response => {
        return {
          tags: response.data.map(tag => new Tag(tag)),
          pagination: new Pagination(response)
        }
      })
    );
  }

  save(data: object = {}): Observable<Tag> {
    return this.apiService.post(`/tags`, data).pipe(
      map(response => {
        return new Tag(response.data)
      })
    );
  }

  update(id: number, data: object = {}): Observable<Tag> {
    return this.apiService.patch(`/tags/${id}`, data).pipe(
      map(response => {
        return new Tag(response.data)
      })
    );
  }

  delete(id): Observable<any> {
    return this.apiService.delete(`/tags/${id}`);
  }
}

