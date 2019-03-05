import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {SettingsProvider} from "../../providers/settings/settings";
import {DomSanitizer} from "@angular/platform-browser";
import {DownloadProvider} from "../../providers/download/download";
import {ResultPage} from "../result/result";
import {ToolsProvider} from "../../providers/tools/tools";

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-favourites',
    templateUrl: 'favourites.html',
})
export class FavouritesPage {
    titolo: string;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public httpProvider: HttpProvider,
                private sanitizer: DomSanitizer,
                public settings: SettingsProvider,
                private download: DownloadProvider,
                private tools: ToolsProvider) {

        this.titolo = "Favourites";
        console.log("FavouritesPage loaded")

    }

    changePage(date){
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, {date: date});
    }
}
