import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: HTMLIonLoadingElement;

  constructor(public loadingCtrl: LoadingController) {}

  // mostra pop-up
  async showLoading(){
      this.loading = await this.loadingCtrl.create({ // Creo il messaggio
          message: 'Gathering data from across the universe...!'
      });
      await this.loading.present(); // Mostra il messaggio
  }

  // nasconde pop-up
  async hideLoading(){
      this.loading.dismiss();
  }
}
