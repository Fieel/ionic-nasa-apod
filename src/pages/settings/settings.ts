import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SettingsProvider} from "../../providers/settings/settings";

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
                public settings: SettingsProvider) {

        this.titolo = "";
        console.log("SettingsPage loaded");

    }

    clearStorage(){
        this.settings.clearStorage();
    }

    ionViewWillLeave(){
        this.settings.updateStorageData();
    }


    ionViewDidLoad() {

    }

}
