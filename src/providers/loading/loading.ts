import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {
    
    loading: Loading;

    constructor(public loadingCtrl: LoadingController) {}

    //mostra pop-up
    showLoading(){
        this.loading = this.loadingCtrl.create({//Creo il messaggio
            content: 'Gathering data from across the universe...!'
        });
        this.loading.present();//Mostra il messaggio
    }

    //nasconde pop-up
    hideLoading(){
        this.loading.dismiss();
    }
}
