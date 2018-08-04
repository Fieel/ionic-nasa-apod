import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ResultPage} from "../result/result";
import {HttpProvider} from "../../providers/http/http";

/**
 * Generated class for the TimemachinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-timemachine',
    templateUrl: 'timemachine.html',
})
export class TimemachinePage {
    date: any;
    stringDate: string;

    title: string;

    constructor(public navCtrl: NavController,
                public httpProvider:HttpProvider) {
        this.title = "Time Machine";
        this.setTodayDate();
    }
    changePage(){
        console.log('CLICK cambio pagina con data ', this.date);
        if(this.date == undefined){
            console.log('data undefined, settando manualmente ad oggi...');
            this.setTodayDate();
            console.log('...data settata. Nuova data: ', this.date);
        }
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, {date: this.date});
    }

    //in caso non venisse settata dall'utente passo la data di oggi
    setTodayDate(){
        this.date = new Date().getTime();
        this.stringDate = this.httpProvider.formatDate(this.date);
        this.date = this.httpProvider.formatDate(this.date);
    }
}
