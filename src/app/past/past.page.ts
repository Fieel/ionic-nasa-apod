import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoadingService } from '../services/loading.service';
import { ToolsService } from '../services/tools.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloadService } from '../services/download.service';
import { NavController } from '@ionic/angular';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.page.html',
  styleUrls: ['./past.page.scss'],
})
export class PastPage {
  // dati statici
  titolo: any;

  // date di calendario
  todayDate: any; // oggi
  pastDates: any; // passato

  // dati APOD
  data: any;
  private orderedData: any[] = [];

  constructor(
      private HttpProvider: HttpService,
      private loading: LoadingService,
      private tools: ToolsService,
      private sanitizer: DomSanitizer,
      private download: DownloadService,
      private navCtrl: NavController,
      private settings: SettingsService,
  ) {
      // titolo pagina
      // this.titolo = 'Last '+ this.settings.daysInThePast +' days';
      this.titolo = 'Past';
      console.log('WeekPage loaded');

      // setto le variabili con le date
      this.todayDate = new Date();
      this.pastDates = [];

      // inizializzo le variabili che conterranno i dati
      this.data = [];

      // carico i dati nell'array che poi userò nella view
      loading.showLoading();
      this.getAPOD(this.settings.daysInThePast, false);
      loading.hideLoading();
  }

  // meglio rifetchare i dati dallo storage prima di mostrare questa pagine
  // in caso sono cambiati preferiti/daysinthepast...
  ionViewWillEnter(){
      this.settings.fetchStorageData();
  }

  getAPOD(days, refresh= false){

      this.tools.presentToast('Downloading APODs...', 3000);

      // se si tratta di un refresh risetto la data di oggi ad oggi così mi ricarica
      // proprio tutti i giorni da oggi
      if (refresh){
          console.log('refreshing past data!');
          this.todayDate = new Date();
          this.pastDates = [];
          this.data = [];
      }

      // nel caso contrario riutilizza l'ultima data e carica date sempre più
      // in dietro nel tempo (simulando un comportamento tipo "carica altro...")

      // crea/aggiorna l'array di date passate
      for (var _i = 0; _i < days; _i++) {
          this.pastDates.push(this.todayDate.setDate(this.todayDate.getDate() - 1));
      }
      // creo/aggiorno l'array di dati usando le date passate
      for (let $i in this.pastDates){
          this.HttpProvider.GetOneDayAPOD(this.tools.formatDate(this.pastDates[$i]))
              .subscribe(data => {
                  this.orderedData[$i] = data;
                  this.data = this.orderedData.filter(item => item);
              }
              // ,error => {
              //     let alert = this.settings.alertCtrl.create({
              //         title: 'Error loading the image',
              //         subTitle: 'Oops, '+error.toString(),
              //         buttons: ['...']
              //     });
              //     alert.present();
              // }
              );
      }
      console.log('date in the past: ', this.pastDates);
  }

  // chiamato durante un refresh
  doRefresh(refresher) {
      console.log('Aggiornamento pagina!');
      this.getAPOD(this.settings.daysInThePast, true);
      console.log('Fine aggiornamento pagina!');
      refresher.complete();
  }

}
