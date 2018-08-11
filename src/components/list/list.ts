import {Component, Input} from '@angular/core';
import {ToolsProvider} from "../../providers/tools/tools";
import {DomSanitizer} from "@angular/platform-browser";
import {DownloadProvider} from "../../providers/download/download";
import {ResultPage} from "../../pages/result/result";
import {NavController} from "ionic-angular";
import {LoadingProvider} from "../../providers/loading/loading";
import {HttpProvider} from "../../providers/http/http";
import {SettingsProvider} from "../../providers/settings/settings";

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent {

    //layout dalle view
    @Input('layout') layout;

    //date di calendario
    todayDate: any;//oggi
    pastDates: any;//passato

    //dati APOD
    private orderedData: any[] = [];
    public data: any[] = []; // use this in your html, as you are already using

  constructor(
      private HttpProvider: HttpProvider,
      private loading: LoadingProvider,
      private tools: ToolsProvider,
      private sanitizer: DomSanitizer,
      private download: DownloadProvider,
      private navCtrl: NavController,
      private settings: SettingsProvider,
  ) {
      console.log('ListComponent loaded: ', this.data, this.layout);

      //setto le variabili con le date
      this.todayDate = new Date();
      this.pastDates = [];

      //inizializzo le variabili che conterranno i dati
      this.data = [];


      //carico i dati nell'array che poi userò nella view
      loading.showLoading();
      this.getAPOD(this.settings.daysInThePast, false);
      loading.hideLoading();
  }



    getAPOD(days, refresh=false){
        //se si tratta di un refresh risetto la data di oggi ad oggi così mi ricarica
        //proprio tutti i giorni da oggi
        if(refresh){
            console.log("refreshing past data!");
            this.todayDate = new Date();
            this.pastDates = [];
            this.data = [];
        }

        //nel caso contrario riutilizza l'ultima data e carica date sempre più
        //in dietro nel tempo (simulando un comportamento tipo "carica altro...")

        //crea/aggiorna l'array di date passate
        for (var _i = 0; _i < days; _i++) {
            this.pastDates.push(this.todayDate.setDate(this.todayDate.getDate() - 1));
        }
        //creo/aggiorno l'array di dati usando le date passate
        for (let $i in this.pastDates){
            this.HttpProvider.GetOneDayAPOD(this.tools.formatDate(this.pastDates[$i]))
                .subscribe(data => {
                    this.orderedData[$i] = data;
                    this.data = this.orderedData.filter(item => item);
                });
        }
        console.log('date in the past: ', this.pastDates);
    }

    changePage(date){
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, {date: date});
    }
}
