import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { CardLayoutComponent } from '../card-layout/card-layout.component';
import { FullscreenLayoutComponent } from '../fullscreen-layout/fullscreen-layout.component';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicImageLoader
  ],
  declarations: [HomePage, CardLayoutComponent, FullscreenLayoutComponent]
})
export class HomePageModule {}
