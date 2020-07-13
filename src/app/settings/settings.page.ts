import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { DownloadService } from '../services/download.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  titolo: string;

  constructor(
    // public navCtrl: NavController,
    // public navParams: NavParams,
    public settings: SettingsService,
    public download: DownloadService
  ) {
    this.titolo = 'Settings';
    console.log('SettingsPage loaded');
    // download.checkCache();
  }

  clearImgCache() {
    this.settings.clearImgCache();
    this.download.deleteCachedImageFiles();

    // let alert = this.settings.alertCtrl.create({
    //   title: 'Deleted cached images',
    //   subTitle: 'All images cached on the device have been deleted.',
    //   buttons: ['Dismiss'],
    // });
    // alert.present();
  }
  clearStorage() {
    this.settings.clearStorage();

    // let alert = this.settings.alertCtrl.create({
    //   title: 'Storage cleared',
    //   subTitle: 'All app settings have been restored to default',
    //   buttons: ['Dismiss'],
    // });
    // alert.present();
  }
  clearFavourites() {
    this.settings.clearFavourites();

    // let alert = this.settings.alertCtrl.create({
    //   title: 'Favourites deleted',
    //   subTitle: 'Your list of favorites has been emptied',
    //   buttons: ['Dismiss'],
    // });
    // alert.present();
  }
  clearAllData() {
    this.clearImgCache();
    this.settings.clearStorage();
    this.settings.clearFavourites();
    this.download.deleteCachedImageFiles();
  }

  // update storage quando si chiude la pagina settings
  ionViewWillLeave() {
    this.settings.updateStorageData();
  }
}
