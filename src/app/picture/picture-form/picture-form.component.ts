import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ImageApiService } from 'src/app/api/image-api.service';
import { AlertService } from 'src/app/config/alert.service';
import { ImageEditRequest } from 'src/app/models/image-edit-request';
import { ImageRequest } from 'src/app/models/image-request';
import { ImageResponse } from 'src/app/models/image-response';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss'],
})
export class PictureFormComponent implements OnInit {

  name: string;
  description: string;
  projectId: string;
  imageResponse: ImageResponse;
  imageRequest: ImageRequest;
  editImage = false;
  loading = false;
  img: string;
  imgOk = false;
  imageEditRequest: ImageEditRequest;
  colorBtnImage: string;

  constructor(
    private imageApiService: ImageApiService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private pictureService: PictureService
    ) { }

  ngOnInit() {
    if(this.editImage) {
      this.name = this.imageResponse.name;
      this.description = this.imageResponse.description;
      this.img = this.imageResponse.img;
      this.imgOk = true;
      this.colorBtnImage = "success";
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(form: NgForm) {
    if(form.valid){
      this.loading = true;


      // If it's the creation of the image
      if(!this.editImage) {
        this.imageRequest = {
          name: this.name,
          description: this.description,
          img: this.img,
          project: this.projectId
        }
      }else {
        this.imageEditRequest = {
          id: this.imageResponse._id,
          name: this.name,
          description: this.description,
          img: this.img,
          project: this.projectId
        }
      }
      if(this.editImage) {
        this.imageApiService.editImage(this.imageEditRequest).subscribe(
          (resultImage) => {
            this.alertService.presentToast("bottom", `L'image "${resultImage.name}" a été modifiée avec succès ! Actualisez la page pour voir les modifications.`, "success")
            console.log('image edited !');
            console.log(resultImage)
            this.loading = false;
          },
          (err) => {
            console.warn('Could not get images', err);
            this.alertService.presentAlert("Erreur","", `L'image n'a pas pu être modifiée`, ["Ok"])
            this.loading = false;
          }
        );
      } else {
        this.imageApiService.addImage(this.imageRequest).subscribe(
          (resultImage) => {
            this.alertService.presentToast("bottom", `L'image "${resultImage.name}" a été ajoutée avec succès ! Actualisez la page pour voir les modifications.`, "success")
            this.loading = false;
          },
          (err) => {
            this.alertService.presentAlert("Erreur","", `La tâche n'a pas pu être créée !`, ["Ok"])
            console.warn('Could not create image', err);
            this.loading = false;
          }
        );
      }
      return this.modalCtrl.dismiss(this.name, 'confirm');
    }else {
      return "error";
    }
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(
      (result) => {
        this.img=result.url;
        this.colorBtnImage = "success";
        this.imgOk = true;
      },
      err => {
        console.warn(err);
      }
    );
  }
}
