import { Injectable } from '@angular/core';
import { ImageApiService } from '../api/image-api.service';
import { ProjectApiService } from '../api/project-api.service';
import { TaskApiService } from '../api/task-api.service';
import { AlertService } from '../config/alert.service';
import { ImageResponse } from '../models/image-response';
import { ProjectResponse } from '../models/project-response';
import { TaskResponse } from '../models/task-response';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  currentProject: ProjectResponse;
  currentTask: TaskResponse;
  currentImages: ImageResponse[];
  projects: ProjectResponse[] = [];
  tasks: TaskResponse[];

  constructor(
    private projectApiService: ProjectApiService,
    private alertService: AlertService, 
    private taskApiService: TaskApiService,
    private imgApiService: ImageApiService) {}

  refreshDB() {
    this.projectApiService.getAllProjects().subscribe(
      (resultProject) => {
     this.projects = resultProject;
    },
    (err) => {
      this.alertService.presentToast("top", "Les projets ne sont pas accessible pour le moment. Veuillez réessayer ultérieurement.", "danger")
      console.warn('Could not access projects', err);
    }
    )

    this.taskApiService.getAllTasks().subscribe(
      (resultTasks) => {
        this.tasks = resultTasks;
      },
      (err) => {
        this.alertService.presentToast("top", "Les tâches ne sont pas accessible pour le moment. Veuillez réessayer ultérieurement.", "danger")
        console.warn('Could not access tasks', err);
      }
    )
  }

  refreshTask(id: string) {
    this.taskApiService.getTask(id).subscribe(
      (resultTask) => {
        this.currentTask = resultTask;
      },
      (err) => {
        // this.alertService.presentToast("top", "La tâche tâches ne sont pas accessible pour le moment. Veuillez réessayer ultérieurement.", "danger")
        console.warn('Could not access the task', err);
      }
    )
  }

  refreshProject(id: string) {
    this.projectApiService.getProject(id).subscribe(
      (resultProject) => {
        this.currentProject = resultProject;
      },
      (err) => {
        // this.alertService.presentToast("top", "La tâche tâches ne sont pas accessible pour le moment. Veuillez réessayer ultérieurement.", "danger")
        console.warn('Could not access the project', err);
      }
    )
  }

  refreshProjectImages(id: string) {
    this.imgApiService.getPicturesFromProject(this.currentProject._id).subscribe(
      (resultImages) => {
        this.currentImages = resultImages
      },
      (err) => {
        console.warn('Could not access the images', err);
      }
    )
  }
}
