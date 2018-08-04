//componenti importanti
import { Component } from '@angular/core';
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { DomSanitizer } from "@angular/platform-browser";
import {NavController} from 'ionic-angular';

//miei provider
import { HttpProvider } from "../../providers/http/http";//per fare richieste http
import { LoadingProvider } from "../../providers/loading/loading";
import { SettingsProvider } from "../../providers/settings/settings";
import { ToolsProvider } from "../../providers/tools/tools";
import {DownloadProvider} from "../../providers/download/download";
import {ResultPage} from "../result/result";

/**
 * Generated class for the WeekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-week',
    templateUrl: 'week.html',
})
export class WeekPage {
    //dati statici
    titolo: any;

    //date di calendario
    todayDate: any;//oggi
    pastDates: any;//passato

    //terrà la data del file in download
    //serve per mostrare solo la batta del download
    //della foto rilevante
    downloading: string;

    //dati APOD
    private orderedData: any[] = [];
    public data: any[] = []; // use this in your html, as you are already using

    constructor(
        private HttpProvider: HttpProvider,
        private loading: LoadingProvider,
        private photoViewer: PhotoViewer,
        private sanitizer: DomSanitizer,
        private settings: SettingsProvider,
        private download: DownloadProvider,
        private tools: ToolsProvider,
        private navCtrl: NavController) {

        //dati statici
        this.titolo = 'Last '+ this.settings.daysInThePast +' days';

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

    //meglio rifetchare i dati dallo storage prima di mostrare questa pagine
    //in caso sono cambiati preferiti/daysinthepast...
    ionViewWillEnter(){
        this.settings.fetchStorageData();
    }

    //chiamato durante un refresh
    doRefresh(refresher) {
        console.log('Aggiornamento pagina!');
        this.getAPOD(this.settings.daysInThePast, true);
        console.log('Fine aggiornamento pagina!');
        refresher.complete();
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
            this.HttpProvider.getSpecificAPOD(this.pastDates[$i])
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