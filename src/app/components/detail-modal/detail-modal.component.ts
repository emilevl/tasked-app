import { Component, Input, OnInit } from '@angular/core';
import { ProjectResponse } from 'src/app/models/project-response';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskResponse } from 'src/app/models/task-response'
import { TaskApiService } from 'src/app/api/task-api.service';
import { TaskFormComponent } from 'src/app/forms/task-form/task-form.component';
import { AlertService } from 'src/app/config/alert.service';
import { ProjectApiService } from 'src/app/api/project-api.service';
import { ProjectFormComponent } from 'src/app/forms/project-form/project-form/project-form.component';
import { PictureService } from 'src/app/picture/picture.service';
import { ImageResponse } from 'src/app/models/image-response';
import { PictureFormComponent } from 'src/app/picture/picture-form/picture-form.component';


@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})

export class DetailModalComponent {
  @Input() project : ProjectResponse;
  public showProgressBar = false;
  // public pictureUrl = "https://qimg.onrender.com/api/images/5aa455ee-3672-4008-88cd-b7f37d9a6394.png";

  constructor (private modalCtrl: ModalController, 
    private taskApiService: TaskApiService,
    private alertController: AlertController,
    private alertService: AlertService,
    private projectApiService: ProjectApiService,
    private pictureService: PictureService) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // confirm() {
  //   return this.modalCtrl.dismiss(this.name, 'confirm');
  // }

  calculateMinutes(startDate: Date, endDate?: Date): Number {
    const start = new Date(startDate);
    let end = new Date(Date.now())
    if ((endDate instanceof Date) && endDate) {
      end = new Date(endDate);
    }
    const diffInMs = end.getTime() - start.getTime();
    // console.log(diffInMs);
    const diffInMinutes = Math.round(diffInMs / (1000 * 60));
    return diffInMinutes;
    
    // console.log(`startDate: ${startDate.getTime()}, endDate: ${typeof(endDate)}`)
    // return (endDate.getTime() - startDate.getTime()) / 1000 / 60;
    // return 42;
  }

  async deleteTask(taskId: string) {
    let confirmation = false;
    confirmation = await this.alertService.showWarningAlert('Êtes-vous sûr de vouloir supprimer la tâche ?')
    
    if (confirmation) {
      this.showProgressBar = true;
    this.taskApiService.deleteTask(taskId).subscribe(
      (result) => {
        // console.log(result);
        this.showProgressBar = false;
        this.alertService.presentAlert("Succès !", "Tâche supprimée", "Actualisez la page pour mettre à jour", ["Ok"]);
      },
      (err) => {
        console.error(err);
        this.showProgressBar = false;
        console.log(`Delete task failed: ${err.message}`);
        this.alertService.presentAlert("Erreur", "La tâche n'a pas pu être supprimée", "Veuillez réessayer ultérieurement", ["Ok"])
      }
    );
    // console.log(taskId);
    }
    
  }

  // async presentAlert(header, subHeader, message, buttons) {
  //   const alert = await this.alertController.create({
  //     header,
  //     subHeader,
  //     message,
  //     buttons,
  //   });

  //   await alert.present();
  // }

  editTask(taskId: string, task: TaskResponse) {
    this.openTaskForm(task)
    console.log("edit: " + taskId);
    // console.log(task);
  }
  ngOnInit() {}

  async openTaskForm(task: TaskResponse) {
    const editTask = true;
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: {taskResponse: task, editTask}
    });
    // console.log(project);
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  toggleActivity($event) {
    console.log(this.project.active);
    this.projectApiService.toggleProjectActivity(this.project._id).subscribe(
      (result) => {
        // console.log(result);
        if (result.active) {
          this.alertService.presentToast("bottom", "Projet activé", "success");
        }else {
          this.alertService.presentToast("bottom", "Projet désactivé", "medium");
        }
        this.project.active = result.active;
        console.log(result)
      },
      (err) => {
        console.error(err);
        // console.log(`Delete project failed: ${err.message}`);
        this.alertService.presentToast("bottom", "Une erreur est survenue, veuillez réessayer plus tard", "danger");
      }
    );
    console.log("TODO: toggle project activity")
  }

  async deleteProject() {
    let confirmation = false;
    confirmation = await this.alertService.showWarningAlert('Êtes-vous sûr de vouloir supprimer la tâche ?')

    if (confirmation) {
      this.showProgressBar = true;
      this.projectApiService.deleteProject(this.project._id).subscribe(
        (result) => {
          // console.log(result);
          this.showProgressBar = false;
          this.alertService.presentAlert("Succès !", "Projet supprimé", "Actualisez la page pour mettre à jour", ["Ok"]);
        },
        (err) => {
          console.error(err);
          this.showProgressBar = false;
          // console.log(`Delete project failed: ${err.message}`);
          this.alertService.presentAlert("Erreur", "Le projet n'a pas pu être supprimé", "Veuillez réessayer ultérieurement", ["Ok"])
        }
      );
    }
  }

  async editProject() {
    // TODO: Terminer ça 
    const editProject = true;
    const modal = await this.modalCtrl.create({
      component: ProjectFormComponent,
      componentProps: {project: this.project, editProject}
    });
    modal.present();
  }


  async openImageForm(image ?: ImageResponse) {
    let editImage = false;
    if (image){
      editImage = true;
    }
    const modal = await this.modalCtrl.create({
      component: PictureFormComponent,
      componentProps: {imageResponse: image, editImage, projectId: this.project._id}
    });
    // console.log(project);
    modal.present();
  }
}