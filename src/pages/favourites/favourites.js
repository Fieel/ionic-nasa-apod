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
import { HttpProvider } from "../../providers/http/http";
import { SettingsProvider } from "../../providers/settings/settings";
import { DomSanitizer } from "@angular/platform-browser";
import { DownloadProvider } from "../../providers/download/download";
import { ResultPage } from "../result/result";
import { ToolsProvider } from "../../providers/tools/tools";
/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FavouritesPage = (function () {
    function FavouritesPage(navCtrl, navParams, httpProvider, sanitizer, settings, download, tools) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.httpProvider = httpProvider;
        this.sanitizer = sanitizer;
        this.settings = settings;
        this.download = download;
        this.tools = tools;
        this.titolo = "Favourites";
    }
    FavouritesPage.prototype.changePage = function (date) {
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, { date: date });
    };
    FavouritesPage = __decorate([
        Component({
            selector: 'page-favourites',
            templateUrl: 'favourites.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            HttpProvider,
            DomSanitizer,
            SettingsProvider,
            DownloadProvider,
            ToolsProvider])
    ], FavouritesPage);
    return FavouritesPage;
}());
export { FavouritesPage };
//# sourceMappingURL=favourites.js.map