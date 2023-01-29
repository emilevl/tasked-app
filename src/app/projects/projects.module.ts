import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectsPageRoutingModule } from './projects-routing.module';

import { ProjectsPage } from './projects.page';
import { TaskFormComponent } from '../forms/task-form/task-form.component';
import { ProjectFormComponent } from '../forms/project-form/project-form/project-form.component';
import { SliderPictureComponent } from '../picture/slider-picture/slider-picture.component';
import { PictureFormComponent } from '../forms/picture-form/picture-form.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsPageRoutingModule
  ],
  declarations: [ProjectsPage, DetailProjectComponent, TaskFormComponent, ProjectFormComponent, SliderPictureComponent, PictureFormComponent]
})
export class ProjectsPageModule {}
