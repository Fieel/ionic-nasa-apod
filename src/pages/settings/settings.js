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
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, settingsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.settingsProvider = settingsProvider;
        this.titolo = "";
    }
    SettingsPage.prototype.clearStorage = function () {
        this.settingsProvider.clearStorage();
    };
    SettingsPage.prototype.ionViewWillLeave = function () {
        this.settingsProvider.updateStorageData();
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
            SettingsProvider])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map