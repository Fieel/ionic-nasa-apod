//componenti nativi ionic/angular
import {Component} from '@angular/core';
import {SplashScreen} from "@ionic-native/splash-screen";
import {DomSanitizer} from "@angular/platform-browser";
//miei provider
import {HttpProvider} from "../../providers/http/http"; //per fare richieste http
import {DownloadProvider} from "../../providers/download/download";
import {ToolsProvider} from "../../providers/tools/tools";
import {SettingsProvider} from "../../providers/settings/settings";

//per usare i pannellini di loading

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    //dati statici
    titolo: any;
    //per l'API
    data: any;
    dataLength: number;

    constructor(
        private splashscreen: SplashScreen,//x gestire lo splashscreen
        private HttpProvider: HttpProvider,//x richieste apod
        private settings: SettingsProvider//x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
    ) {
        //1. inizializzo variabili
        this.titolo = "Today";
        this.data = {};

        //2. faccio la mia richiesta API
        this.getAPOD();
        this.dataLength = Object.keys(this.data).length;
        //3. nascondo lo splashscreen
        this.splashscreen.hide();

    }

    //chiamato durante un refresh
    // doRefresh(refresher) {
    //     console.log('Aggiornamento pagina!');
    //     this.getAPOD();
    //     console.log('Fine aggiornamento pagina!');
    //     refresher.complete();
    // }

    //chiamata all'api
    getAPOD(){
        console.log('Caricamento dati APOD TODAY..');
        this.HttpProvider.getAPOD()
            .subscribe(data => {
                this.data = data;
                this.dataLength = Object.keys(this.data).length;
            });
    }


}