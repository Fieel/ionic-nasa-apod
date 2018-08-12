var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//componenti nativi ionic/angular
import { Component } from '@angular/core';
import { SplashScreen } from "@ionic-native/splash-screen";
import { CacheService } from 'ionic-cache';
//miei provider
import { HttpProvider } from "../../providers/http/http"; //per fare richieste http
import { SettingsProvider } from "../../providers/settings/settings";
//per usare i pannellini di loading
var HomePage = (function () {
    function HomePage(splashscreen, //x gestire lo splashscreen
        HttpProvider, //x richieste apod
        settings, //x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
        cache) {
        this.splashscreen = splashscreen;
        this.HttpProvider = HttpProvider;
        this.settings = settings;
        this.cache = cache;
        //1. inizializzo variabili
        this.titolo = "Today";
        this.data = {};
        //2. faccio la mia richiesta API
        this.getAPOD();
        this.dataLength = Object.keys(this.data).length;
        //3. nascondo lo splashscreen
        this.splashscreen.hide();
        console.log("HomePage loaded");
    }
    //chiamato durante un refresh
    HomePage.prototype.doRefresh = function (refresher) {
        console.log('Aggiornamento pagina!');
        this.getAPOD();
        console.log('Fine aggiornamento pagina!');
        refresher.complete();
    };
    //chiamata all'api
    HomePage.prototype.getAPOD = function () {
        var _this = this;
        console.log('Caricamento dati APOD TODAY..');
        var req = this.HttpProvider.getAPOD()
            .subscribe(function (data) {
            _this.data = data;
            _this.dataLength = Object.keys(_this.data).length;
        });
        //caching experiment
        this.apod = this.cache.loadFromObservable(this.HttpProvider.url, req);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [SplashScreen,
            HttpProvider,
            SettingsProvider,
            CacheService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map