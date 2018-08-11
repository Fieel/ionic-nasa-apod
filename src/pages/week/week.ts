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

    constructor(private settings: SettingsProvider) {
        //titolo pagina
        this.titolo = 'Last '+ this.settings.daysInThePast +' days';
        console.log("WeekPage loaded")
    }

    //meglio rifetchare i dati dallo storage prima di mostrare questa pagine
    //in caso sono cambiati preferiti/daysinthepast...
    ionViewWillEnter(){
        this.settings.fetchStorageData();
    }

    //chiamato durante un refresh
    // doRefresh(refresher) {
    //
    //
    //
    //     console.log('Aggiornamento pagina!');
    //     this.getAPOD(this.settings.daysInThePast, true);
    //     console.log('Fine aggiornamento pagina!');
    //     refresher.complete();
    // }
}