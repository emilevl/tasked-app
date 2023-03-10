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
import { PictureFormComponent } from 'src/app/forms/picture-form/picture-form.component';


@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss'],
})

export class DetailProjectComponent {
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

  async deleteTask(taskId: string) {
    let confirmation = false;
    confirmation = await this.alertService.showWarningAlert('??tes-vous s??r de vouloir supprimer la t??che ?')
    
    if (confirmation) {
      this.showProgressBar = true;
    this.taskApiService.deleteTask(taskId).subscribe(
      (result) => {
        // console.log(result);
        this.showProgressBar = false;
        this.alertService.presentAlert("Succ??s !", "T??che supprim??e", "Actualisez la page pour mettre ?? jour", ["Ok"]);
      },
      (err) => {
        console.error(err);
        this.showProgressBar = false;
        console.log(`Delete task failed: ${err.message}`);
        this.alertService.presentAlert("Erreur", "La t??che n'a pas pu ??tre supprim??e", "Veuillez r??essayer ult??rieurement", ["Ok"])
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
          this.alertService.presentToast("bottom", "Projet activ??", "success");
        }else {
          this.alertService.presentToast("bottom", "Projet d??sactiv??", "medium");
        }
        this.project.active = result.active;
        console.log(result)
      },
      (err) => {
        console.error(err);
        // console.log(`Delete project failed: ${err.message}`);
        this.alertService.presentToast("bottom", "Une erreur est survenue, veuillez r??essayer plus tard", "danger");
      }
    );
  }

  async deleteProject() {
    let confirmation = false;
    confirmation = await this.alertService.showWarningAlert('??tes-vous s??r de vouloir supprimer la t??che ?')

    if (confirmation) {
      this.showProgressBar = true;
      this.projectApiService.deleteProject(this.project._id).subscribe(
        (result) => {
          // console.log(result);
          this.showProgressBar = false;
          this.alertService.presentAlert("Succ??s !", "Projet supprim??", "Actualisez la page pour mettre ?? jour", ["Ok"]);
        },
        (err) => {
          console.error(err);
          this.showProgressBar = false;
          // console.log(`Delete project failed: ${err.message}`);
          this.alertService.presentAlert("Erreur", "Le projet n'a pas pu ??tre supprim??", "Veuillez r??essayer ult??rieurement", ["Ok"])
        }
      );
    }
  }

  async editProject() { 
    const editProject = true;
    const modal = await this.modalCtrl.create({
      component: ProjectFormComponent,
      componentProps: {projectResponse: this.project, editProject}
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