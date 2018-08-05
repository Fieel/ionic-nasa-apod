var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//componenti
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageLoaderConfig } from "ionic-image-loader";
//pagine
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from "../pages/about/about";
import { TimemachinePage } from "../pages/timemachine/timemachine";
import { SettingsPage } from "../pages/settings/settings";
import { FavouritesPage } from "../pages/favourites/favourites";
//provider
import { SettingsProvider } from "../providers/settings/settings";
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, imageLoaderConfig, settings) {
        var _this = this;
        this.imageLoaderConfig = imageLoaderConfig;
        this.settings = settings;
        this.rootPage = TabsPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //carico le settings dallo storage
            _this.settings.fetchStorageData();
            statusBar.styleDefault();
            // splashScreen.hide();
        });
    }
    MyApp.prototype.openHomePage = function () {
        this.nav.setRoot(TabsPage);
    };
    MyApp.prototype.openTimemachinePage = function () {
        this.nav.push(TimemachinePage);
    };
    MyApp.prototype.openFavouritesPage = function () {
        this.nav.push(FavouritesPage);
    };
    MyApp.prototype.openSettingsPage = function () {
        this.nav.setRoot(SettingsPage);
    };
    MyApp.prototype.openAboutPage = function () {
        this.nav.push(AboutPage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
        }),
        __metadata("design:paramtypes", [Platform,
            StatusBar,
            SplashScreen,
            ImageLoaderConfig,
            SettingsProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map