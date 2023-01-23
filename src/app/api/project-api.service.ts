import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ProjectRequest } from '../models/project-request';
import { ProjectResponse } from '../models/project-response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(public http: HttpClient) { }

  getAllProjects() : Observable<ProjectResponse[]> {
    const url = `${environment.apiUrl}/projects`;
    return this.http.get<ProjectResponse[]>(url);
    // let data = ApiService.httpRequest();
    // this.http.get(url).subscribe((dataReturned) => {
    //   // console.log(`projects loaded`, trips);
    //   data = dataReturned;
    // return {};
  }

  getProject(projectId: string) : Observable<ProjectResponse> {
    if (projectId) {
      const url = `${environment.apiUrl}/projects/${projectId}`;
      return this.http.get<ProjectResponse>(url);
    }
    return undefined;
    
    // let data = ApiService.httpRequest();
    // this.http.get(url).subscribe((dataReturned) => {
    //   // console.log(`projects loaded`, trips);
    //   data = dataReturned;
    // return {};
  }
}
