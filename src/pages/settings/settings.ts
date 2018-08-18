import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SettingsProvider} from "../../providers/settings/settings";
import {DownloadProvider} from "../../providers/download/download";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    titolo: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public settings: SettingsProvider,
                public download: DownloadProvider) {

        this.titolo = "";
        console.log("SettingsPage loaded");
        // download.checkCache();
    }


    clearImgCache(){
        this.settings.clearImgCache();
        this.download.deleteCachedImageFiles();


        let alert = this.settings.alertCtrl.create({
            title: 'Deleted cached images',
            subTitle: 'All images cached on the device have been deleted.',
            buttons: ['Dismiss']
        });
        alert.present();

    }
    clearStorage(){
        this.settings.clearStorage();

        let alert = this.settings.alertCtrl.create({
            title: 'Storage cleared',
            subTitle: 'All app settings have been restored to default',
            buttons: ['Dismiss']
        });
        alert.present();
    }
    clearFavourites(){
        this.settings.clearFavourites();

        let alert = this.settings.alertCtrl.create({
            title: 'Favourites deleted',
            subTitle: 'Your list of favourites has been emptied',
            buttons: ['Dismiss']
        });
        alert.present();

    }
    clearAllData(){
        this.settings.clearImgCache();
        this.settings.clearStorage();
        this.settings.clearFavourites();
    }

    //update storage quando si chiude la pagina settings
    ionViewWillLeave(){
        this.settings.updateStorageData();
    }


    ionViewDidLoad() {

    }

}
