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
}
