import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskRequest } from '../models/task-request';
import { TaskResponse } from '../models/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(public http: HttpClient) { }

  createTask(data: TaskRequest) : Observable<TaskRequest> {
    const url = `${environment.apiUrl}/tasks`;

    return this.http.post<TaskRequest>(url, data);
    // let data = ApiService.httpRequest();
    // this.http.get(url).subscribe((dataReturned) => {
    //   // console.log(`projects loaded`, trips);
    //   data = dataReturned;
    // return {};
  }

  getAllTasks() : Observable<TaskResponse[]> {
    const url = `${environment.apiUrl}/tasks`;
    return this.http.get<TaskResponse[]>(url);
    // let data = ApiService.httpRequest();
    // this.http.get(url).subscribe((dataReturned) => {
    //   // console.log(`projects loaded`, trips);
    //   data = dataReturned;
    // return {};
  }

  getTask(taskId: string) : Observable<TaskResponse> {
    if (taskId) {
      const url = `${environment.apiUrl}/tasks/${taskId}`;
      return this.http.get<TaskResponse>(url);
    }
    return undefined;
    
    // let data = ApiService.httpRequest();
    // this.http.get(url).subscribe((dataReturned) => {
    //   // console.log(`projects loaded`, trips);
    //   data = dataReturned;
    // return {};
  }

  deleteTask(taskId: string) {
    if(taskId) {
      this.getTask(taskId).subscribe(
        (result) => {
          const url = `${environment.apiUrl}/tasks/${taskId}`;
          return this.http.delete<Task>(url);
          // for (const project in result) {
          //   console.log(typeof(project))
          // }
        },
        (err) => {
          console.warn('Could not access task', err)
        }
      )
      }
    }
    
}
