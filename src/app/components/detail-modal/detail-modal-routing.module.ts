import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailModalComponent } from './detail-modal.component';

const routes: Routes = [
  {
    path: '',
    component: DetailModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailModalPageRoutingModule {}
