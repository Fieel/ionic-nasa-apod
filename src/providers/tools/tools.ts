import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SettingsProvider} from "../settings/settings";
import {PhotoViewer} from "@ionic-native/photo-viewer";


@Injectable()
export class ToolsProvider {

    constructor(public http: HttpClient,
                private settings: SettingsProvider,
                private photoViewer: PhotoViewer) {
        console.log('Hello ToolsProvider Provider');
    }

    //GESTIONE ASYNC DATI/VIEW
    //ritorna vero o falso in base al fatto che i dati si sono già caricati,
    //serve alle view per non crashare siccome si caricano più in fretta di quanto
    //si inizializzino le variabili lol.
    dataAvailable(){
        if(this.settings.favourites===undefined){
            return false;
        } else {
            return true;
        }
    }

    //GESTIONE PREFERITI
    //due metodi che aggiornano l'array contenente i preferiti
    addToFavorites(data){
        this.settings.addToFavourites(data);
    }
    removeFromFavorites(data){
        this.settings.removeFromFavourites(data);
    }
    checkIfFavourite(date): boolean{
        console.log('Controllo preferiti...');
        for(let i of this.settings.favourites){
            if(i.date == date){
                return true;
            }
        }
        return false;
    }

    //apre l'immagine cliccata in fullscreen
    showFullScreenImage(hdurl){
        this.photoViewer.show(hdurl);
    }

    getYoutubeVideoId(youtubeUrl: string){
        console.log('url youtube: ', youtubeUrl);
        console.log('substringa test ', youtubeUrl.substr(0,23));

        //solo se si tratta di un link di youtube..
        if(youtubeUrl.substr(0,23) == 'https://www.youtube.com'){
            //estrazione
            let videoId = youtubeUrl.match('d\\/(\\w+)\\?rel=\\d+');

            console.log('id estratto: ', videoId);
            console.log('url thumbnail: ', 'https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg');

            if(videoId == null){
                console.log('videoId is null');
                return 'assets/imgs/no-thumb.png';
            } else {
                console.log('videoId is NOT null');
                return 'https://img.youtube.com/vi/'+videoId[1]+'/hqdefault.jpg';
            }
        } else {
            console.log('Non un link di youtube!!');
            return 'assets/imgs/no-thumb.png';
        }
    }
}
