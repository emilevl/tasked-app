import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { DeleteResponse } from '../models/delete-response';
import { ProjectEditRequest } from '../models/project-edit-request';
import { ProjectRequest } from '../models/project-request';
import { ProjectResponse } from '../models/project-response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(public http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  createProject(projectRequest: ProjectRequest) : Observable<ProjectRequest> {
    const url = `${environment.apiUrl}/projects`;

    return this.http.post<ProjectRequest>(url, projectRequest);
    // let data = ApiService.httpRequest();
    // this.http.get(url).subscribe((dataReturned) => {
    //   // console.log(`projects loaded`, trips);
    //   data = dataReturned;
    // return {};
  }

  deleteProject(projectId: string): Observable<DeleteResponse>{
    const url = `${environment.apiUrl}/projects/${projectId}`;
    // return this.http.delete(url);
    return this.http.delete<DeleteResponse>(url, this.httpHeader)
  }

  toggleProjectActivity(projectId: string): Observable<ProjectResponse> {
    const url = `${environment.apiUrl}/projects/${projectId}/toggleactivity`;
    return this.http.post<ProjectResponse>(url, projectId);
  }

  editProject(project: ProjectEditRequest): Observable<ProjectResponse>{
    const url = `${environment.apiUrl}/projects/${project.id}`;
    // return this.http.delete(url);
    return this.http.patch<ProjectResponse>(url, project)
  }
}
