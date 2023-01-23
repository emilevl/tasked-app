import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';
import { ProjectResponse } from 'src/app/models/project-response';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.page.html',
  styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit {
  @Input() project ?: ProjectResponse;
  presentingElement = undefined;

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController, private route: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.project);
    this.presentingElement = document.querySelector('.ion-page');
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

}
