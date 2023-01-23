import { Component, Input, OnInit } from '@angular/core';
import { ProjectResponse } from 'src/app/models/project-response';
import { AlertController, ModalController } from '@ionic/angular';
import { TaskResponse } from 'src/app/models/task-response'
import { TaskApiService } from 'src/app/api/task-api.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent {
  @Input() project ?: ProjectResponse;
  constructor (private modalCtrl: ModalController, 
    private taskApiService: TaskApiService,
    private alertController: AlertController) { }

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
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (confirmation) {
    console.log(this.taskApiService.deleteTask(taskId));
    // console.log(taskId);
    }
    
  }

  editTask(taskId: string, task: TaskResponse) {
    console.log("edit: " + taskId);
    console.log(task);
  }
  ngOnInit() {}

}