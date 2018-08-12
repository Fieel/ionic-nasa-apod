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
import { PhotoViewer } from "@ionic-native/photo-viewer";
var ToolsProvider = (function () {
    function ToolsProvider(http, photoViewer) {
        this.http = http;
        this.photoViewer = photoViewer;
    }
    //apre l'immagine cliccata in fullscreen
    ToolsProvider.prototype.showFullScreenImage = function (hdurl) {
        this.photoViewer.show(hdurl);
    };
    //Estrae l'ID di un video dal proprio URL di youtube così da prenderne la thumbnail
    //da mostrare come thumbnail al posto dell'immagine
    ToolsProvider.prototype.getYoutubeVideoId = function (youtubeUrl) {
        // console.log('url youtube: ', youtubeUrl);
        // console.log('substringa test ', youtubeUrl.substr(0,23));
        //solo se si tratta di un link di youtube..
        if (youtubeUrl.substr(0, 23) == 'https://www.youtube.com') {
            //estrazione
            var videoId = youtubeUrl.match('d\\/(\\w+)\\?rel=\\d+');
            // console.log('id estratto: ', videoId);
            // console.log('url thumbnail: ', 'https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg');
            if (videoId == null) {
                // console.log('videoId is null');
                return 'assets/imgs/no-thumb.png';
            }
            else {
                // console.log('videoId is NOT null');
                return 'https://img.youtube.com/vi/' + videoId[1] + '/hqdefault.jpg';
            }
        }
        else {
            // console.log('Non un link di youtube!!');
            return 'assets/imgs/no-thumb.png';
        }
    };
    //Formatta date da SECONDI a YYYY-MM-DD
    ToolsProvider.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    ToolsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            PhotoViewer])
    ], ToolsProvider);
    return ToolsProvider;
}());
export { ToolsProvider };
//# sourceMappingURL=tools.js.map