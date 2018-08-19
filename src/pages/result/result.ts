import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { LoadingProvider } from "../../providers/loading/loading";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { DomSanitizer } from "@angular/platform-browser";
import { SettingsProvider } from "../../providers/settings/settings";
import { DownloadProvider } from "../../providers/download/download";
import { ToolsProvider} from "../../providers/tools/tools";

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-result',
    templateUrl: 'result.html',
})
export class ResultPage {

    pageTitle: string;
    date: any;

    //per l'API
    data: any;
    dataLength: number;//usato nella view per testare se si e' online

    constructor(
        private navParams: NavParams,
                private HttpProvider: HttpProvider,
                private settings: SettingsProvider
    ) {

        this.pageTitle = "Detail";
        this.date = navParams.get('date');
        console.log('data input: ', this.date);

        this.data = {};

        this.getAPOD(this.date);
        this.dataLength = Object.keys(this.data).length;

        console.log("ResultPage loaded");
    }

    //chiamato durante un refresh
    doRefresh(refresher) {
        console.log('Aggiornamento pagina!');
        this.getAPOD(this.date, true);
        console.log('Fine aggiornamento pagina!');
        refresher.complete();
    }

    getAPOD(date, reloadCache: boolean = false){
        this.HttpProvider.GetOneDayAPOD(date, reloadCache)
            .subscribe(data => {
                this.data = data;
                this.dataLength = Object.keys(this.data).length;
            }
            // ,error => {
            //         let alert = this.settings.alertCtrl.create({
            //             title: 'Error loading the image',
            //             subTitle: 'Oops, '+error.toString(),
            //             buttons: ['...']
            //         });
            //         alert.present();
            //     }
                );

    }


}
