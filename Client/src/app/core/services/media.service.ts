import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import {ApiService} from "./api.service";
import {Media} from "../models";
import {Observable} from "rxjs";

@Injectable()
export class MediaService {

  constructor(
    private apiService: ApiService
  ) {}

  save(MediaParam): Observable<Media> {
    const formData = new FormData(); console.log(MediaParam.file);
    formData.append('file', MediaParam.file);
    formData.append('subject_id', MediaParam.subjectId);
    formData.append('subject_type', MediaParam.subjectType);
    formData.append('category', MediaParam.category);

    return this.apiService.post('/media', formData).pipe(
      map(response => {
        return new Media(response.data)
      })
    );
  }

  delete(id: number|string): Observable<any> {
    return this.apiService.delete(`/media/${id}`);
  }
}

interface MediaParam {
  file: File;
  subjectId?: number;
  subjectType: string;
  category: string;
}
