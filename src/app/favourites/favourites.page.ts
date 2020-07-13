import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from '../services/settings.service';
import { DownloadService } from '../services/download.service';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {
  titolo: string;
    constructor(public navCtrl: NavController,
                public httpProvider: HttpService,
                private sanitizer: DomSanitizer,
                public settings: SettingsService,
                private download: DownloadService,
                private tools: ToolsService) {

        this.titolo = 'Favourites';
        console.log('FavouritesPage loaded');

    }

    changePage(date){
        console.log('apertura pagina result...');
        // TODO: navigazione verso la pagina di dettaglio
        // this.navCtrl.push(ResultPage, {date: date});
    }

}
