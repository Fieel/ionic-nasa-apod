var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
var DownloadProvider = (function () {
    function DownloadProvider(http, file, alertCtrl) {
        this.http = http;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.progress = 0;
    }
    DownloadProvider.prototype.downloadImage = function (pictureUrl, name, date) {
        var _this = this;
        //questa variabile mi permette tramite un ngIf di mostrare solo una barra di
        //progresso download alla volta e non tutte assieme.
        this.downloadingDate = date;
        //nuova richiesta http di tipo blob
        var req = new HttpRequest('GET', pictureUrl, {
            reportProgress: true,
            responseType: "blob"
        });
        //tutti gli eventi che partiranno durante la richiesta ed il download
        this.http.request(req).subscribe(function (event) {
            switch (event.type) {
                case HttpEventType.Sent:
                    console.log('Request sent!');
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('Response header received!');
                    break;
                //tiene traccia del progresso del download
                case HttpEventType.DownloadProgress:
                    var kbLoaded = Math.round(event.loaded / 1024);
                    console.log("Download in progress! " + kbLoaded + "Kb loaded");
                    _this.progress = Math.trunc(event.loaded / event.total * 100);
                    break;
                //salvo il file una volta arrivato
                case HttpEventType.Response:
                    console.log('😺 Done!', event.body);
                    _this.file.writeFile(_this.file.dataDirectory, "tmp.jpg", event.body, { replace: true }).then(function (file) {
                        console.log('download.ts, tmp.jpg: file tmp salvato con successo', file);
                        window.cordova.plugins.imagesaver.saveImageToGallery(_this.file.dataDirectory + 'tmp.jpg', onSaveImageSuccess, onSaveImageError);
                        var alertCtrl = _this.alertCtrl;
                        //successo totale
                        function onSaveImageSuccess() {
                            console.log('download.ts, tmp.jpg: salvataggio riuscito nella cartella Images/Pictures.');
                            var alert = alertCtrl.create({
                                title: 'Image saved! :D',
                                subTitle: 'The picture \"' + name + '\" has been saved in your phone gallery.',
                                buttons: ['Wow, rad!']
                            });
                            alert.present();
                        }
                        //fallimento nello spostare il file in images
                        function onSaveImageError(error) {
                            console.log('download.ts, tmp.jpg: errore durante il salvataggio nella cartella Images/Pictures.!!' + error);
                            var alert = alertCtrl.create({
                                title: 'Download error :(.',
                                subTitle: 'For some reason we couldn\'t save the picture in your gallery. Please try again!',
                                buttons: ['Damn!']
                            });
                            alert.present();
                        }
                    }).catch(function (err) {
                        var alert = _this.alertCtrl.create({
                            title: 'Couldn\'t save the picture D:.',
                            subTitle: 'For some reason we couldn\'t save the picture in your gallery. Please try again!',
                            buttons: ['Not again!']
                        });
                        alert.present();
                        console.log('download.ts, tmp.jpg: errore nel salvataggio', err);
                    });
            }
        });
    };
    DownloadProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            File,
            AlertController])
    ], DownloadProvider);
    return DownloadProvider;
}());
export { DownloadProvider };
//# sourceMappingURL=download.js.map