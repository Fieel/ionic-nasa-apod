import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimemachinePageRoutingModule } from './timemachine-routing.module';

import { TimemachinePage } from './timemachine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimemachinePageRoutingModule
  ],
  declarations: [TimemachinePage]
})
export class TimemachinePageModule {}
