import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProjectApiService } from 'src/app/api/project-api.service';
import { AlertService } from 'src/app/config/alert.service';
import { ImageResponse } from 'src/app/models/image-response';
import { ProjectRequest } from 'src/app/models/project-request';
import { ProjectResponse } from 'src/app/models/project-response';
import { TaskEditRequest } from 'src/app/models/task-edit-request';
import { TaskResponse } from 'src/app/models/task-response';
import { UserResponse } from 'src/app/models/user-response';
import { PictureFormComponent } from 'src/app/picture/picture-form/picture-form.component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {

  name: string;
  active = true;
  description?: string;
  company: string;
  tasks: Array<TaskResponse[]>;
  projectResponse: ProjectResponse;
  projectRequest: ProjectRequest;
  taskEditRequest: TaskEditRequest;
  author: UserResponse;
  editProject = false;

  showProgressBar = false;

  constructor(private modalCtrl: ModalController, 
    private projectApiService: ProjectApiService,
    private alertService: AlertService) { }

  ngOnInit() {
    if(this.editProject) {
      this.name = this.projectResponse.name;
      this.description = this.projectResponse.description;
      this.company = this.projectResponse.company
    } 
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(form: NgForm) {
    if(form.valid){
      this.showProgressBar = true;
      if (this.editProject) {

      }else {
        this.projectRequest = {
          name: this.name,
          description: this.description,
          active: this.active,
          company: this.company
        }
        // console.log(this.projectRequest);

        this.projectApiService.createProject(this.projectRequest).subscribe(
          (resultProject) => {
            this.alertService.presentAlert("Succès","", `Le projet ${resultProject.name} a été créé !`, ["Ok"])
            console.log('project edited !');
            console.log(resultProject)
            this.showProgressBar = false;
            return this.modalCtrl.dismiss(null, 'cancel');
          },
          (err) => {
            console.warn('Could not create project', err);
            this.alertService.presentAlert("Erreur","", `Le projet n'a pas pu être modifié`, ["Ok"])
            this.showProgressBar = false;
          }
        );
      }
    }
  }
}
