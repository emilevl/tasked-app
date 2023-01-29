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
import { Observable } from 'rxjs';
import { TaskFormComponent } from '../forms/task-form/task-form.component';
import { ProjectFormComponent } from '../forms/project-form/project-form/project-form.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})

export class ProjectsPage implements OnInit {
    projects: Array<ProjectResponse>;
    tasks ?: TaskResponse;
    message ?: string;
    // displaySearchResult: boolean
    projectsToShow: Array<ProjectResponse>
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

  
  

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getProjects();
      event.target.complete();
    }, 2000);
  };

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
      component: DetailProjectComponent,
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

  async openProjectForm() {
    const modal = await this.modalCtrl.create({
      component: ProjectFormComponent
      
    });
    // console.log(project);
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  getProjects() {
    this.projectApiService.getAllProjects().subscribe(
      (result) => {
        // console.log(result[0])
        // for (const project in result) {
        //   console.log(typeof(project))
        // }
        this.projects = result;
        this.projectsToShow = this.projects;
        // console.log(result);
      },
      (err) => {
        console.warn('Could not access projects', err)
      }
    )
  }

  calculateTime(tasks) {
    let totalMinutes = 0;

    tasks.forEach(task => {
      totalMinutes += this.calculateMinutes(task);
    });
    return totalMinutes;
  }

  calculateMinutes(task) {
    const startDate = new Date(task.startDate);
      let now = new Date()
      if(task.endDate) {
        const now = new Date(task.endDate);
      }
      
      const diffTime = Math.abs(now.getTime() - startDate.getTime());
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    return diffMinutes;
  }

  getHoursMinutesFromMin(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes < 10 ? '0' + minutes : minutes}min`;
  }

  search(event) {
    let searchText: string = event.detail.value;
    this.projectsToShow = this.projects.filter((pr) =>
      pr.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // if (this.projectsSearch != '') {
    //   this.displaySearchResult = true;
    // } else {
    //   this.displaySearchResult = false;
    // }
  }
}
