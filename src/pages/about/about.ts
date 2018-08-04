import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";

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
    FAQdata: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private HttpProvider: HttpProvider) {

        this.titolo = "";

    }

    getFAQdata(){
        this.HttpProvider.getFAQdata().subscribe( data => {
            this.FAQdata = data;
        })
    }

}
