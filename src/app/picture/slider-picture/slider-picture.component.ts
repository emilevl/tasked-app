import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { ImageApiService } from 'src/app/api/image-api.service';
import { ImageResponse } from 'src/app/models/image-response';
import { PictureFormComponent } from '../picture-form/picture-form.component';

@Component({
  selector: 'app-slider-picture',
  templateUrl: './slider-picture.component.html',
  styleUrls: ['./slider-picture.component.scss'],
})
export class SliderPictureComponent implements OnInit {
  // public pictureUrl = "https://qimg.onrender.com/api/images/5aa455ee-3672-4008-88cd-b7f37d9a6394.png";

  // option = {
  //   slidesPerView: 1.5,
  //   centeredSlides: true,
  //   loop: true,
  //   spaceBetween: 10,
  //   // autoplay: true
  // }

  // private projectId: string;
  public pictures: ImageResponse[];
  public picturesExisting = false;
  public loading = true;
  @Input() projectId: string;

  constructor(
    private imageApiService: ImageApiService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.imageApiService.getPicturesFromProject(this.projectId).subscribe(
      (resultImages) => {
        console.log(resultImages)
        this.loading = false;
        if(resultImages.length > 0) {
          this.pictures = resultImages;
          this.picturesExisting = true;
        } else {
          console.log("Il n'y a pas d'images")
          this.picturesExisting = false;
        }
      },
      (err) => {
        console.warn('Could not access pictures', err);
        this.loading = false;
        this.picturesExisting = false;
      }
    );    
  }

  async openImageForm(image ?: ImageResponse) {
    let editImage = false;
    if (image){
      editImage = true;
    }
    const modal = await this.modalCtrl.create({
      component: PictureFormComponent,
      componentProps: {imageResponse: image, editImage, projectId: image.project}
    });
    // console.log(project);
    modal.present();
  }

  // @ViewChild('slides') ionSlides: IonSlides;

  // next() {
  //   this.ionSlides.slideNext();
  // }

  // prev() {
  //   this.ionSlides.slidePrev();
  // }
}
