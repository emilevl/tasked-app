import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskEditRequest } from '../models/task-edit-request';
import { TaskRequest } from '../models/task-request';
import { TaskResponse } from '../models/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(public http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  deleteTask(taskId: string): Observable<Task>{
      const url = `${environment.apiUrl}/tasks/${taskId}`;
      // return this.http.delete(url);
      return this.http.delete<Task>(url, this.httpHeader)
      // .pipe(tap(_ => console.log(`Task deleted: ${taskId}`)),
      // catchError(this.handleError<Task>('Delete task'))
      // );
      // this.getTask(taskId).subscribe(
      //   (result) => {
      //     console.log(taskId);
          
      //     // for (const project in result) {
      //     //   console.log(typeof(project))
      //     // }
      //   },
      //   (err) => {
      //     console.warn('Could not access task', err)
      //   }
      // )
    }

    editTask(task: TaskEditRequest): Observable<TaskResponse>{
      const url = `${environment.apiUrl}/tasks/${task.id}`;
      // return this.http.delete(url);
      return this.http.patch<TaskResponse>(url, task)
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
    
}
