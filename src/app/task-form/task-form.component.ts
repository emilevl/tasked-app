import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProjectApiService } from '../api/project-api.service';
import { TaskApiService } from '../api/task-api.service';
import { ProjectResponse } from '../models/project-response';
import { TaskRequest } from '../models/task-request';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {

  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  selectedProject: string;
  projects: Array<ProjectResponse>;
  task: TaskRequest;

  constructor(private modalCtrl: ModalController, private projectApiService: ProjectApiService, private taskApiService: TaskApiService) { }

  ngOnInit() {
    this.getProjects(); 
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(form: NgForm) {
    if(form.valid){
      this.task = {
        name: this.name,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        project: this.selectedProject
      }
      this.projectApiService.getProject(this.selectedProject).subscribe(
        (result) => {
          if(result ) {
            console.log("MyTasks: ")
            console.log(this.task)
            this.taskApiService.createTask(this.task).subscribe(
              (resultTask) => {
                console.log('new task : ', resultTask);
                // resultTask.date = new Date(resultTask.date)
                //   .toLocaleDateString('fr')
                //   .toString();
                // this.storeService.setCurrentReview(resultTask);
                // this.router.navigateByUrl('/review');
              },
              (err) => {
                console.warn('Could not get tasks', err);
              }
            );
          }
          
        }

        
      )
      return this.modalCtrl.dismiss(this.name, 'confirm');
    }else {
      return "error";
    }
  }

  getProjects() {
    this.projectApiService.getAllProjects().subscribe(
      (result) => {
        // console.log(result[0])
        // for (const project in result) {
        //   console.log(typeof(project))
        // }
        this.projects = result;
        // console.log(result);
      },
      (err) => {
        console.warn('Could not access projects', err)
      }
    )
  }

}
