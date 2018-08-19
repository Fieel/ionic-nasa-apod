var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from "../../providers/settings/settings";
import { DownloadProvider } from "../../providers/download/download";
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, settings, download) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settings = settings;
        this.download = download;
        this.titolo = "";
        console.log("SettingsPage loaded");
        // download.checkCache();
    }
    SettingsPage.prototype.clearImgCache = function () {
        this.settings.clearImgCache();
        this.download.deleteCachedImageFiles();
        var alert = this.settings.alertCtrl.create({
            title: 'Deleted cached images',
            subTitle: 'All images cached on the device have been deleted.',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SettingsPage.prototype.clearStorage = function () {
        this.settings.clearStorage();
        var alert = this.settings.alertCtrl.create({
            title: 'Storage cleared',
            subTitle: 'All app settings have been restored to default',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SettingsPage.prototype.clearFavourites = function () {
        this.settings.clearFavourites();
        var alert = this.settings.alertCtrl.create({
            title: 'Favourites deleted',
            subTitle: 'Your list of favourites has been emptied',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SettingsPage.prototype.clearAllData = function () {
        this.settings.clearImgCache();
        this.settings.clearStorage();
        this.settings.clearFavourites();
    };
    //update storage quando si chiude la pagina settings
    SettingsPage.prototype.ionViewWillLeave = function () {
        this.settings.updateStorageData();
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
    };
    SettingsPage = __decorate([
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            SettingsProvider,
            DownloadProvider])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map