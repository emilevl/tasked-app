import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageEditRequest } from '../models/image-edit-request';
import { ImageRequest } from '../models/image-request';
import { ImageResponse } from '../models/image-response';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService {

  constructor(public http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPicturesFromProject(projectId: string): Observable<ImageResponse[]> {
    const url = `${environment.apiUrl}/images?project=${projectId}`;
    return this.http.get<ImageResponse[]>(url);
  }

  addImage(imageRequest: ImageRequest) : Observable<ImageRequest> {
    const url = `${environment.apiUrl}/images`;

    return this.http.post<ImageRequest>(url, imageRequest);
  }

  editImage (imageEditRequest: ImageEditRequest): Observable<ImageResponse> {
    const url = `${environment.apiUrl}/images/${imageEditRequest.id}`;
      // return this.http.delete(url);
      return this.http.patch<ImageResponse>(url, imageEditRequest)
  }
}
