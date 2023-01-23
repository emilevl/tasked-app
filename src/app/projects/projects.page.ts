import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from "src/app/auth/auth.service";
import { environment } from "src/environments/environment";
import { ProjectApiService } from '../api/project-api.service';
import { ProjectResponse } from '../models/project-response';
import { TaskResponse } from '../models/task-response';
import { UserResponse } from '../models/user-response';
import { NgForOf } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { DetailModalPage } from '../components/detail-modal/detail-modal.page';
import { Observable } from 'rxjs';
import { DetailModalComponent } from '../components/detail-modal/detail-modal.component';
import { TaskFormComponent } from '../task-form/task-form.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})

export class ProjectsPage implements OnInit {
    projects: Array<ProjectResponse>;
    tasks ?: TaskResponse;
    message ?: string;
  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router,
    private projectApiService: ProjectApiService,
    // Inject the HTTP client
    public http: HttpClient,
    private modalCtrl: ModalController,

    public apiService: ApiService
  ) { }

  
  

  ionViewWillEnter(): void {
    // const projects = this.apiService.httpRequest("/projects", "GET")
    // console.log(projects);
    // this.projectApi.getAll().subscribe;
  }

  ngOnInit() {
    this.getProjects(); 
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  async openProject(project : ProjectResponse) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: {project: project}
    });
    // console.log(project);
    modal.present();
  }

  async openTaskForm() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent
    });
    // console.log(project);
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  getProjects() {
    this.projectApiService.getAllProjects().subscribe(
      (result) => {
        console.log(result[0])
        // for (const project in result) {
        //   console.log(typeof(project))
        // }
        this.projects = result;
        console.log(result);
      },
      (err) => {
        console.warn('Could not access projects', err)
      }
    )
  }

  calculateMinutes(startDate: Date, endDate?: Date): Number {
    const start = new Date(startDate);
    let end = new Date(Date.now())
    if ((endDate instanceof Date) && endDate) {
      end = new Date(endDate);
    }
    const diffInMs = end.getTime() - start.getTime();
    console.log(diffInMs);
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));
    return diffInMinutes;
    
    // console.log(`startDate: ${startDate.getTime()}, endDate: ${typeof(endDate)}`)
    // return (endDate.getTime() - startDate.getTime()) / 1000 / 60;
    // return 42;
  }
}
