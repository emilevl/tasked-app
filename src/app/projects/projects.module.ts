import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectsPageRoutingModule } from './projects-routing.module';

import { ProjectsPage } from './projects.page';
import { DetailModalComponent } from '../components/detail-modal/detail-modal.component';
import { TaskFormComponent } from '../forms/task-form/task-form.component';
import { ProjectFormComponent } from '../forms/project-form/project-form/project-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsPageRoutingModule
  ],
  declarations: [ProjectsPage, DetailModalComponent, TaskFormComponent, ProjectFormComponent]
})
export class ProjectsPageModule {}
