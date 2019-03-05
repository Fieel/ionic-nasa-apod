import { HttpClient,
    HttpRequest,
    HttpEvent,
    HttpEventType} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';
import { ToolsProvider } from "../tools/tools";
import { LoadingController } from 'ionic-angular';

declare var window: any;
declare var cordova: any;

@Injectable()
export class DownloadProvider {
    
    data: Blob;
    downloadingDate: string;
    progress: number;

    freeSpace: string;

    constructor(private http: HttpClient,
                private file: File,
                public alertCtrl: AlertController,
                private base64: Base64,
                private tools: ToolsProvider,
                public loadingCtrl: LoadingController) {
        this.progress = 0;
    }

    // scarica un'immagine e la salva nelal galleria
    // se il quarto parametro é true invece che salvare nella galleria setta l'immagine come wallpaper
    public downloadImage(pictureUrl, name, date, setWallpaper: boolean = false){

        console.log('Downloading image', pictureUrl, name, date, setWallpaper);


        //console.log('applicationDirectory, dataDirectory, cacheDirectory',this.file.applicationDirectory, this.file.dataDirectory, this.file.cacheDirectory);


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

                    if(setWallpaper) {

                        var loading = this.loadingCtrl.create({
                            content: 'Setting up new wallpaper....',
                        });

                        loading.present();
                    } else {
                        var loading = this.loadingCtrl.create({
                            content: 'Saving image to gallery....',
                        });

                        loading.present();
                    }

                    this.file.writeFile(this.file.dataDirectory, "tmp.jpg", event.body, {replace: true}).then(
                        (file) => {
                            console.log('download.ts, tmp.jpg: file tmp salvato con successo', file);

                            // Se la flag é true allora setta il wallpaper invece che salvare nella gallery
                            if(setWallpaper){


                                console.log('Encodin del wallpaper in base64... ' , this.file.dataDirectory+'tmp.jpg');

                                // Prende il file temporaneo appena scaricato e lo trasforma in una stringa base64
                                this.base64.encodeFile(this.file.dataDirectory+'tmp.jpg').then((base64File: string) => {

                                    console.log('Conversione in Base64 riuscita: ', base64File);
                                    // la stringa arriva con un header da tagliar via, che finisce a 'base64, '
                                    // se non lo si toglie la funzione per settare il wallpaper non funziona
                                    let slug = base64File.split('base64,').pop();
                                    console.log('Substr del file base64: ', slug);

                                    // Usa la stringa base64 e la uso per settare il wallpaper
                                    window.plugins.wallpaper.setImageBase64(slug,
                                         error => {
                                            console.log('Errore nella settaggio del wallpaper: ', error);
                                        });


                                    // toast che segnala l'imminente cambio di wallpaper
                                    this.tools.presentToast('Phone wallpaper changed!', 3000);
                                    loading.dismiss();




                                }, (err) => {
                                    console.log('Errore nella conversione in BAse64',err);
                                });


                            }else{
                                console.log('Spostando il file temporaneo nella gallery... ');
                                // sposta il file temporaneo nella galleria
                                (<any>window).cordova.plugins.imagesaver.saveImageToGallery(this.file.dataDirectory+'tmp.jpg', onSaveImageSuccess, onSaveImageError);
                                loading.dismiss();
                            }




                            let alertCtrl = this.alertCtrl;
                            var self = this;//per poter usare il contesto this ed accedere al toastCtrl nella funzione sottostante
                            //successo totale
                            function onSaveImageSuccess(){
                                console.log('download.ts, tmp.jpg: salvataggio riuscito nella cartella Images/Pictures.');
                                self.tools.presentToast('Image saved in the phone gallery', 3000);
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
    }

    deleteCachedImageFiles(){

        // /cache
        // per controllare la root della cartella di cache
        // se ci sono cartelle strane lo vedo
        this.file.listDir(this.file.cacheDirectory,'').then((result)=>{
            console.log('files in cache directory: ', result);
        }) ;





        // /cache/org.chromium.android_webview
        // dove stanno tutte le immagini cachate che pesano un bordello
        this.file.listDir(this.file.cacheDirectory,'org.chromium.android_webview').then((result)=>{

            console.log('files in org.chromium.android_webview directory: ', result);

            console.log('Started deleting files from org.chromium.android_webview folder!');

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
                            console.log('Error deleting file from org.chromium.android_webview folder: ', error) ;
                            console.log('Name: ' + name + ' / Size: ' + size) ;
                        }) ;
                    });

                }
            }
        }) ;


        // /picasso-cache
        // Ci finiscono le immagini cachate dal plugin che apre a schermo intero le foto
        this.file.listDir(this.file.cacheDirectory,'picasso-cache').then((result)=>{

            console.log('files in picasso-cache directory: ', result);

            console.log('Started deleting files from picasso-cache folder!');

            for(let file of result){

                if(file.isFile == true){

                    this.file.removeFile(this.file.cacheDirectory+'/picasso-cache/', file.name).then( data => {
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
                            console.log('Error deleting file from picasso-cache folder: ', error) ;
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
