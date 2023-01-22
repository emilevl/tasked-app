import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  httpRequest(path: string, method?: string, body?: Object ): Object {
    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}${path}`;
    let data = {};
    this.http.get(url).subscribe((dataReturned) => {
      // console.log(`projects loaded`, trips);
      data = dataReturned;
    });
    return data;
  }
}
