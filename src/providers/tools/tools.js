var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsProvider } from "../settings/settings";
import { PhotoViewer } from "@ionic-native/photo-viewer";
var ToolsProvider = (function () {
    function ToolsProvider(http, settings, photoViewer) {
        this.http = http;
        this.settings = settings;
        this.photoViewer = photoViewer;
        console.log('Hello ToolsProvider Provider');
    }
    //GESTIONE ASYNC DATI/VIEW
    //ritorna vero o falso in base al fatto che i dati si sono già caricati,
    //serve alle view per non crashare siccome si caricano più in fretta di quanto
    //si inizializzino le variabili lol.
    ToolsProvider.prototype.dataAvailable = function () {
        if (this.settings.favourites === undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    //GESTIONE PREFERITI
    //due metodi che aggiornano l'array contenente i preferiti
    ToolsProvider.prototype.addToFavorites = function (data) {
        this.settings.addToFavourites(data);
    };
    ToolsProvider.prototype.removeFromFavorites = function (data) {
        this.settings.removeFromFavourites(data);
    };
    ToolsProvider.prototype.checkIfFavourite = function (date) {
        console.log('Controllo preferiti...');
        for (var _i = 0, _a = this.settings.favourites; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.date == date) {
                return true;
            }
        }
        return false;
    };
    //apre l'immagine cliccata in fullscreen
    ToolsProvider.prototype.showFullScreenImage = function (hdurl) {
        this.photoViewer.show(hdurl);
    };
    ToolsProvider.prototype.getYoutubeVideoId = function (youtubeUrl) {
        console.log('url youtube: ', youtubeUrl);
        console.log('substringa test ', youtubeUrl.substr(0, 23));
        //solo se si tratta di un link di youtube..
        if (youtubeUrl.substr(0, 23) == 'https://www.youtube.com') {
            //estrazione
            var videoId = youtubeUrl.match('d\\/(\\w+)\\?rel=\\d+');
            console.log('id estratto: ', videoId);
            console.log('url thumbnail: ', 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg');
            if (videoId == null) {
                console.log('videoId is null');
                return 'assets/imgs/no-thumb.png';
            }
            else {
                console.log('videoId is NOT null');
                return 'https://img.youtube.com/vi/' + videoId[1] + '/hqdefault.jpg';
            }
        }
        else {
            console.log('Non un link di youtube!!');
            return 'assets/imgs/no-thumb.png';
        }
    };
    ToolsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            SettingsProvider,
            PhotoViewer])
    ], ToolsProvider);
    return ToolsProvider;
}());
export { ToolsProvider };
//# sourceMappingURL=tools.js.map