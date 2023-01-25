import { Component, Input, OnInit } from '@angular/core';
import { ProjectResponse } from 'src/app/models/project-response';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskResponse } from 'src/app/models/task-response'
import { TaskApiService } from 'src/app/api/task-api.service';
import { TaskFormComponent } from 'src/app/forms/task-form/task-form.component';
import { AlertService } from 'src/app/config/alert.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent {
  @Input() project ?: ProjectResponse;
  public showProgressBar = false;

  constructor (private modalCtrl: ModalController, 
    private taskApiService: TaskApiService,
    private alertController: AlertController,
    private alertService: AlertService) { }

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
    const alert = await this.alertController.create({
      header: 'Alert!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            confirmation = false;
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            confirmation = true;
            this.showProgressBar = true;
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (confirmation) {
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

}