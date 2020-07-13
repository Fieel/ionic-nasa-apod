import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimemachinePage } from './timemachine.page';

const routes: Routes = [
  {
    path: '',
    component: TimemachinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimemachinePageRoutingModule {}
