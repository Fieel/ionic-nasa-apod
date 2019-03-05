import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    titolo: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {

        this.titolo = "";
        console.log("AboutPage loaded");

    }

}
