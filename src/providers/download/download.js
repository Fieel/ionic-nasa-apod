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
import { Base64 } from '@ionic-native/base64';
import { ToolsProvider } from "../tools/tools";
var DownloadProvider = (function () {
    function DownloadProvider(http, file, alertCtrl, base64, tools) {
        this.http = http;
        this.file = file;
        this.alertCtrl = alertCtrl;
        this.base64 = base64;
        this.tools = tools;
        this.progress = 0;
    }
    // scarica un'immagine e la salva nelal galleria
    // se il quarto parametro é true invece che salvare nella galleria setta l'immagine come wallpaper
    DownloadProvider.prototype.downloadImage = function (pictureUrl, name, date, setWallpaper) {
        var _this = this;
        if (setWallpaper === void 0) { setWallpaper = false; }
        console.log('Downloading image', pictureUrl, name, date, setWallpaper);
        //console.log('applicationDirectory, dataDirectory, cacheDirectory',this.file.applicationDirectory, this.file.dataDirectory, this.file.cacheDirectory);
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
                        // Se la flag é true allora setta il wallpaper invece che salvare nella gallery
                        if (setWallpaper) {
                            // toast che segnala l'imminente cambio di wallpaper
                            _this.tools.presentToast('Setting up new wallpaper...', 5000);
                            console.log('Encodin del wallpaper in base64... ', _this.file.dataDirectory + 'tmp.jpg');
                            // Prende il file temporaneo appena scaricato e lo trasforma in una stringa base64
                            _this.base64.encodeFile(_this.file.dataDirectory + 'tmp.jpg').then(function (base64File) {
                                console.log('Conversione in Base64 riuscita: ', base64File);
                                // la stringa arriva con un header da tagliar via, che finisce a 'base64, '
                                // se non lo si toglie la funzione per settare il wallpaper non funziona
                                var slug = base64File.split('base64,').pop();
                                console.log('Substr del file base64: ', slug);
                                // Usa la stringa base64 e la uso per settare il wallpaper
                                window.plugins.wallpaper.setImageBase64(slug, function (error) {
                                    console.log('Errore nella settaggio del wallpaper: ', error);
                                });
                            }, function (err) {
                                console.log('Errore nella conversione in BAse64', err);
                            });
                        }
                        else {
                            console.log('Spostando il file temporaneo nella gallery... ');
                            // sposta il file temporaneo nella galleria
                            window.cordova.plugins.imagesaver.saveImageToGallery(_this.file.dataDirectory + 'tmp.jpg', onSaveImageSuccess, onSaveImageError);
                        }
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
                                subTitle: 'We couldn\'t save the picture in your gallery. Please try again!',
                                buttons: ['Damn!']
                            });
                            alert.present();
                        }
                    }).catch(function (err) {
                        var alert = _this.alertCtrl.create({
                            title: 'Couldn\'t save the picture D:.',
                            subTitle: 'We couldn\'t save the picture in your gallery. Please try again!',
                            buttons: ['Not again!']
                        });
                        alert.present();
                        console.log('download.ts, tmp.jpg: errore nel salvataggio', err);
                    });
            }
        });
    };
    DownloadProvider.prototype.checkCache = function () {
        var _this = this;
        this.file.getFreeDiskSpace().then(function (data) {
            _this.freeSpace = data.toPrecision(1);
        });
    };
    DownloadProvider.prototype.deleteCachedImageFiles = function () {
        var _this = this;
        // /cache
        // per controllare la root della cartella di cache
        // se ci sono cartelle strane lo vedo
        this.file.listDir(this.file.cacheDirectory, '').then(function (result) {
            console.log('files in cache directory: ', result);
        });
        // cache/org.chromium.android_webview
        // dove stanno tutte le immagini cachate che pesano un bordello
        this.file.listDir(this.file.cacheDirectory, 'org.chromium.android_webview').then(function (result) {
            console.log('files in org.chromium.android_webview directory: ', result);
            console.log('Started deleting files from cache folder!');
            var _loop_1 = function (file) {
                if (file.isFile == true) {
                    _this.file.removeFile(_this.file.cacheDirectory + '/org.chromium.android_webview/', file.name).then(function (data) {
                        console.log('file removed: ', _this.file);
                        data.fileRemoved.getMetadata(function (metadata) {
                            var name = data.fileRemoved.name;
                            var size = metadata.size;
                            var fullPath = data.fileRemoved.fullPath;
                            console.log('Deleted file: ', name, size, fullPath);
                            console.log('Name: ' + name + ' / Size: ' + size);
                        });
                    }).catch(function (error) {
                        file.getMetadata(function (metadata) {
                            var name = file.name;
                            var size = metadata.size;
                            console.log('Error deleting file from cache folder: ', error);
                            console.log('Name: ' + name + ' / Size: ' + size);
                        });
                    });
                }
            };
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var file = result_1[_i];
                _loop_1(file);
            }
        });
    };
    DownloadProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            File,
            AlertController,
            Base64,
            ToolsProvider])
    ], DownloadProvider);
    return DownloadProvider;
}());
export { DownloadProvider };
//# sourceMappingURL=download.js.map