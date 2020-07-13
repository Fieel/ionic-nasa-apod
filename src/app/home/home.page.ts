import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // dati statici
  titolo: any;
  // per l'API
  data: any;
  dataLength: number;

  constructor(
    // private splashscreen: SplashScreen, // x gestire lo splashscreen
    private httpService: HttpService, // x richieste apod
    private settings: SettingsService // x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
  ) {
    // //1. inizializzo variabili
    this.titolo = 'Today';
    this.data = {};

    // 2. faccio la mia richiesta API
    this.getAPOD();
    this.dataLength = Object.keys(this.data).length;
    // 3. nascondo lo splashscreen
    // this.splashscreen.hide();

    console.log('DEBUG HomePage loaded', this.settings.todayLayout);
  }

  // chiamato durante un refresh
  doRefresh(refresher) {
    console.log('Aggiornamento pagina!');
    this.getAPOD(true);
    console.log('Fine aggiornamento pagina!');
    refresher.complete();
  }

  // chiamata all'api
  getAPOD(reloadCache: boolean = false) {
    console.log('Caricamento dati APOD TODAY..');
    this.httpService.getAPOD(reloadCache).subscribe(
      data => {
        console.log('DEBUG home, data received', data);
        this.data = data;
        this.dataLength = Object.keys(this.data).length;
      },
      error => {
        // let alert = this.settings.alertCtrl.create({
        //     title: 'Error loading the image',
        //     subTitle: 'Oops, '+error.toString(),
        //     buttons: ['...']
        // });
        // alert.present();
        console.log('error loading homepage data', error);
      }
    );
  }
}
