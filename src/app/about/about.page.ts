import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {

  titolo: string;

  constructor() {

      this.titolo = 'About';
      console.log('AboutPage loaded');

  }

}
