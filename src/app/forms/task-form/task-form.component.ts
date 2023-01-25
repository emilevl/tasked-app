import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProjectApiService } from '../../api/project-api.service';
import { TaskApiService } from '../../api/task-api.service';
import { AlertService } from '../../config/alert.service';
import { ProjectResponse } from '../../models/project-response';
import { TaskEditRequest } from '../../models/task-edit-request';
import { TaskRequest } from '../../models/task-request';
import { TaskResponse } from '../../models/task-response';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  // @Input() taskToEditData ?: TaskResponse;

  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  selectedProject: string;
  projects: Array<ProjectResponse>;
  taskRequest: TaskRequest;
  taskResponse: TaskResponse;
  taskEditRequest: TaskEditRequest;
  editTask = false;

  showProgressBar = false;


  constructor(private modalCtrl: ModalController, 
    private projectApiService: ProjectApiService,
    private taskApiService: TaskApiService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getProjects();
    if(this.editTask) {
      this.selectedProject = this.taskResponse.project.toString()
      this.name = this.taskResponse.name;
      this.description = this.taskResponse.description;
      this.startDate = this.taskResponse.startDate;
      this.endDate = this.taskResponse.endDate;
    } 
  }

  ionViewDidEnter() {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(form: NgForm) {
    if(form.valid){
      this.showProgressBar = true;


      // If it's a task creation
      if(!this.editTask) {
        this.taskRequest = {
          name: this.name,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          project: this.selectedProject
        }
      }else {
        this.taskEditRequest = {
          id: this.taskResponse.id,
          name: this.name,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          project: this.selectedProject
        }
      }
      
      this.projectApiService.getProject(this.selectedProject).subscribe(
        (result) => {
          if(result ) {
            if(this.editTask) {
              this.taskApiService.editTask(this.taskEditRequest).subscribe(
                (resultTask) => {
                  this.alertService.presentAlert("Succès","", `La tâche ${resultTask.name} a été modifiée avec succès !`, ["Ok"])
                  console.log('task edited !');
                  console.log(resultTask)
                  this.showProgressBar = false;

                },
                (err) => {
                  console.warn('Could not get tasks', err);
                  this.alertService.presentAlert("Erreur","", `La tâche n'a pas pu être modifiée`, ["Ok"])
                  this.showProgressBar = false;
                }
              );
            } else {
              this.taskApiService.createTask(this.taskRequest).subscribe(
                (resultTask) => {
                  this.alertService.presentAlert("Succès","", `La tâche ${resultTask.name} a été créee avec succès !`, ["Ok"])
                  this.showProgressBar = false;
                },
                (err) => {
                  this.alertService.presentAlert("Erreur","", `La tâche n'a pas pu être créée !`, ["Ok"])
                  console.warn('Could not get tasks', err);
                  this.showProgressBar = false;
                }
              );
            }
            
          }
          
        },
        (err) => {
          console.warn("The project doesn't exist")
        }

        
      )
      return this.modalCtrl.dismiss(this.name, 'confirm');
    }else {
      return "error";
    }
  }

  getProjects() {
    this.showProgressBar = true;
    this.projectApiService.getAllProjects().subscribe(
      (result) => {
        // console.log(result[0])
        // for (const project in result) {
        //   console.log(typeof(project))
        // }
        this.projects = result;
        this.showProgressBar = false;
        // console.log(result);
      },
      (err) => {
        console.warn('Could not access projects', err)
      }
    )
  }

}
