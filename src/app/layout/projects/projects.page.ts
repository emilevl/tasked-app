import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    // Inject the HTTP client
    public http: HttpClient
  ) { }

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = "https://tasked.onrender.com/projects";
    this.http.get(url).subscribe((trips) => {
      console.log(`projects loaded`, trips);
    });
  }

  ngOnInit() {
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

}
