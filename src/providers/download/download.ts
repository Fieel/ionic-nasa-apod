import { HttpClient,
    HttpRequest,
    HttpEvent,
    HttpEventType} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';

@Injectable()
export class DownloadProvider {
    data: Blob;
    downloadingDate: string;
    progress: number;

    freeSpace: string;

    constructor(private http: HttpClient,
                private file: File,
                public alertCtrl: AlertController) {
        this.progress = 0;
    }

    downloadImage(pictureUrl, name, date){

        console.log('applicationDirectory, dataDirectory, cacheDirectory',this.file.applicationDirectory, this.file.dataDirectory, this.file.cacheDirectory);


        //questa variabile mi permette tramite un ngIf di mostrare solo una barra di
        //progresso download alla volta e non tutte assieme.
        this.downloadingDate = date;

        //nuova richiesta http di tipo blob
        const req = new HttpRequest('GET', pictureUrl, {
            reportProgress: true,
            responseType: "blob"
        });

        //tutti gli eventi che partiranno durante la richiesta ed il download
        this.http.request(req).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
                case HttpEventType.Sent:
                    console.log('Request sent!');
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('Response header received!');
                    break;
                    //tiene traccia del progresso del download
                case HttpEventType.DownloadProgress:
                    const kbLoaded = Math.round(event.loaded / 1024);
                    console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
                    this.progress = Math.trunc(event.loaded / event.total * 100);
                    break;
                    //salvo il file una volta arrivato
                case HttpEventType.Response:
                    console.log('😺 Done!', event.body);
                    this.file.writeFile(this.file.dataDirectory, "tmp.jpg", event.body, {replace: true}).then(
                        (file) => {
                            console.log('download.ts, tmp.jpg: file tmp salvato con successo', file);
                            (<any>window).cordova.plugins.imagesaver.saveImageToGallery(this.file.dataDirectory+'tmp.jpg', onSaveImageSuccess, onSaveImageError);


                            let alertCtrl = this.alertCtrl;

                            //successo totale
                            function onSaveImageSuccess(){
                                console.log('download.ts, tmp.jpg: salvataggio riuscito nella cartella Images/Pictures.');
                                let alert = alertCtrl.create({
                                    title: 'Image saved! :D',
                                    subTitle: 'The picture \"'+name+'\" has been saved in your phone gallery.',
                                    buttons: ['Wow, rad!']
                                });
                                alert.present();
                            }
                            //fallimento nello spostare il file in images
                            function onSaveImageError(error) {
                                console.log('download.ts, tmp.jpg: errore durante il salvataggio nella cartella Images/Pictures.!!' + error);
                                let alert = alertCtrl.create({
                                    title: 'Download error :(.',
                                    subTitle: 'We couldn\'t save the picture in your gallery. Please try again!',
                                    buttons: ['Damn!']
                                });
                                alert.present();
                            }
                        }).catch(
                        (err) => {
                            let alert = this.alertCtrl.create({
                                title: 'Couldn\'t save the picture D:.',
                                subTitle: 'We couldn\'t save the picture in your gallery. Please try again!',
                                buttons: ['Not again!']
                            });
                            alert.present();
                            console.log('download.ts, tmp.jpg: errore nel salvataggio', err);
                        });
            }
        });
    }

    checkCache(){

        this.file.getFreeDiskSpace().then( data => {
            this.freeSpace = data.toPrecision(1);
        });



        // this.file.listDir(this.file.cacheDirectory,'').then((result)=>{
        //     console.log('files in cache directory: ', result);
        //
        // }) ;
        //
        // this.file.listDir(this.file.cacheDirectory,'WebView').then((result)=>{
        //     console.log('files in WebView directory: ', result);
        // }) ;

        // this.file.listDir(this.file.cacheDirectory,'image-loader-cache').then((result)=>{
        //     console.log('files in image-loader-cache directory: ', result);
        // }) ;
        //
        // this.file.listDir(this.file.cacheDirectory,'org.chromium.android_webview').then((result)=> {
        //     console.log('files in org.chromium.android_webview directory: ', result);
        // });
    }

    deleteCachedImageFiles(){

        // /cache
        // per controllare la root della cartella di cache
        // se ci sono cartelle strane lo vedo
        this.file.listDir(this.file.cacheDirectory,'').then((result)=>{
            console.log('files in cache directory: ', result);
        }) ;

        // cache/org.chromium.android_webview
        // dove stanno tutte le immagini cachate che pesano un bordello
        this.file.listDir(this.file.cacheDirectory,'org.chromium.android_webview').then((result)=>{

            console.log('files in org.chromium.android_webview directory: ', result);

            console.log('Started deleting files from cache folder!');

            for(let file of result){

                if(file.isFile == true){

                    this.file.removeFile(this.file.cacheDirectory+'/org.chromium.android_webview/', file.name).then( data => {
                        console.log('file removed: ', this.file);
                        data.fileRemoved.getMetadata(function (metadata) {
                            let name = data.fileRemoved.name;
                            let size = metadata.size ;
                            let fullPath = data.fileRemoved.fullPath;
                            console.log('Deleted file: ', name, size, fullPath) ;
                            console.log('Name: ' + name + ' / Size: ' + size) ;
                        }) ;
                    }).catch( error => {
                        file.getMetadata(function (metadata) {
                            let name = file.name ;
                            let size = metadata.size ;
                            console.log('Error deleting file from cache folder: ', error) ;
                            console.log('Name: ' + name + ' / Size: ' + size) ;
                        }) ;
                    });

                }
            }
        }) ;
    }

    //metodo che usavo prima ma falliva spesso i download, usando
    //XMLHTTP generale invece che HttpClient di Ionic
    // downloadImageLegacy(url, name, date){
    //     //aggiorno la data del file in download
    //     //(lo uso per identificare nella view di quale foto si tratta)
    //     //così da mostrare la progressbar del download specifica della foto
    //     this.downloadingDate = date;
    //     console.log(date);
    //
    //
    //     let file = this.file;
    //     let alertCtrl = this.alertCtrl;
    //
    //     // let alert = alertCtrl.create({
    //     //     title: 'Download starting...',
    //     //     subTitle: name+" will be downloaded.",
    //     //     buttons: ['Cool, thanks!']
    //     // });
    //     // alert.present();
    //
    //
    //     //CREAZIONE RICHIESTA
    //     console.log('1. Creazione richiesta XMLHttp...');
    //     let oReq = new XMLHttpRequest();
    //
    //     //listener progresso
    //     oReq.addEventListener("progress", updateProgress);
    //
    //     //INVIO RICHIESTA
    //     console.log('2. Richiesta in corso...', url, name);
    //     oReq.open("GET", url, true);
    //     oReq.responseType = "blob"; //tipo blob pls
    //
    //     //creo il div da selezionare
    //     let div = ".progress-inner"+date;
    //
    //     //PROGRESSO DOWNLOAD
    //     function updateProgress (oEvent) {
    //         if (oEvent.lengthComputable) {
    //             console.log("%: ", oEvent.loaded / oEvent.total * 100+'%');
    //             //setto con jquery
    //             $(div).width(oEvent.loaded / oEvent.total * 100+'%');
    //             $(div).text(Math.trunc(oEvent.loaded / oEvent.total * 100)+'%');
    //         } else {
    //             // Unable to compute progress information since the total size is unknown
    //         }
    //     }
    //
    //     //ALLA RICEZIONE SCRIVERE NEL FILESYSTEM
    //     oReq.onload = function(oEvent) {
    //         console.log("2.1 Dati ricevuti: ", oReq.response);
    //         console.log("3. Scrittura nella cartella files dell'app...");
    //         //salva il file temporaneo nella cartella dell'app come jpeg
    //         file.writeFile(file.externalDataDirectory, 'tmp.jpg', oReq.response, { replace: true }).then( data => {
    //             console.log('3.1 tmp.jpg salvata: ', data);
    //             console.log('3.2 file path:', file.externalDataDirectory+'tmp.jpg');
    //             console.log("4. Fine download+Scrittura.");
    //             console.log("5. Inizio salvataggio manuale....");
    //             //SALVATAGGIO NELLA CARTELLA DELL'UTENTE
    //             (<any>window).cordova.plugins.imagesaver.saveImageToGallery(file.externalDataDirectory+'tmp.jpg', onSaveImageSuccess, onSaveImageError);
    //             function onSaveImageSuccess(){
    //                 console.log('6. Salvataggio riuscito nella cartella Images/Pictures.');
    //                 let alert = alertCtrl.create({
    //                     title: 'Image saved! :D',
    //                     subTitle: 'The picture \"'+name+'\" has been saved in your phone gallery.',
    //                     buttons: ['Wow, rad!']
    //                 });
    //                 alert.present();
    //             }
    //             function onSaveImageError(error) {
    //                 console.log('6. Salvataggio fallito!!' + error);
    //                 let alert = this.alertCtrl.create({
    //                     title: 'Download error :(.',
    //                     subTitle: 'For some reason we couldn\'t save the picture in your gallery. Please try again!',
    //                     buttons: ['Damn!']
    //                 });
    //                 alert.present();
    //             }
    //         });
    //     };
    //     oReq.send();
    // }
}
