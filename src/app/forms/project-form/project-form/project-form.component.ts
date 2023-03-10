import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProjectApiService } from 'src/app/api/project-api.service';
import { AlertService } from 'src/app/config/alert.service';
import { ImageResponse } from 'src/app/models/image-response';
import { ProjectEditRequest } from 'src/app/models/project-edit-request';
import { ProjectRequest } from 'src/app/models/project-request';
import { ProjectResponse } from 'src/app/models/project-response';
import { TaskEditRequest } from 'src/app/models/task-edit-request';
import { TaskResponse } from 'src/app/models/task-response';
import { UserResponse } from 'src/app/models/user-response';
import { PictureFormComponent } from 'src/app/forms/picture-form/picture-form.component';

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
  projectEditRequest: ProjectEditRequest;
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
      this.active = this.projectResponse.active;
    } 
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(form: NgForm) {
    if(form.valid){
      this.showProgressBar = true;
      if (this.editProject) {
        this.projectEditRequest = {
          id: this.projectResponse._id,
          name: this.name,
          description: this.description,
          active: this.active,
          company: this.company
        }

        this.projectApiService.editProject(this.projectEditRequest).subscribe(
          (resultProject) => {
            this.alertService.presentToast("bottom", `Le projet "${resultProject.name}" a bien ??t?? modifi?? !`, "success")
            // console.log('project edited !');
            console.log(resultProject)
            this.showProgressBar = false;
            return this.modalCtrl.dismiss(null, 'cancel');
          },
          (err) => {
            console.warn('Could not edit project', err);
            this.alertService.presentAlert("Erreur","", `Le projet n'a pas pu ??tre modifi??. Veuillez r??essayer ult??rieurement`, ["Ok"])
            this.showProgressBar = false;
          }
        );
      }else {
        this.projectRequest = {
          name: this.name,
          description: this.description,
          active: this.active,
          company: this.company
        }
        this.projectApiService.createProject(this.projectRequest).subscribe(
          (resultProject) => {
            this.alertService.presentAlert("Succ??s","", `Le projet ${resultProject.name} a ??t?? cr???? !`, ["Ok"])
            console.log('project edited !');
            console.log(resultProject)
            this.showProgressBar = false;
            return this.modalCtrl.dismiss(null, 'cancel');
          },
          (err) => {
            console.warn('Could not create project', err);
            this.alertService.presentAlert("Erreur","", `Le projet n'a pas pu ??tre modifi??`, ["Ok"])
            this.showProgressBar = false;
          }
        );
        // console.log(this.projectRequest);
      }
    }
  }
}
