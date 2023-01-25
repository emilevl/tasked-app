import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }


  async presentAlert(header, subHeader, message, buttons) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons,
    });

    await alert.present();
  }

  async showWarningAlert(message) {
    let confirmation: boolean;
    const alert = await this.alertController.create({
      header: 'Attention !',
      message,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            confirmation = false;
          },
        },
        {
          text: 'Confirmer',
          role: 'confirm',
          handler: () => {
            confirmation = true;
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return confirmation;
  }
}
