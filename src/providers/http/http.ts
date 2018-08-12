import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { CacheService } from "ionic-cache";

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
    //per la logica interna
    url: string;
    //data: any;
    // urlCambiato: boolean;
    APIkey: string;

    apod: Observable<any>;
    apodKeys = 'apod-keys-group';

    constructor(public http: HttpClient, public cache: CacheService) {
        //inizializzo
        //this.data = {};
        this.url = 'https://api.nasa.gov/planetary/apod?api_key=';
        this.APIkey = 'uoEtZqnZxnmcYLuG57SfvvYDu1c5g5kPtJfOSR3S';
    }

    //ritorna i dati APOD del giorno attuale e basta
    getAPOD() {

        //caching
        let request = this.http.get(this.url+this.APIkey);
        console.log('New http request: ', request);

        return this.cache.loadFromObservable(this.url+this.APIkey, request, this.apodKeys)
            //.catch(error => Observable.throw(error.json() || 'Server Error'));

        // return this.http.get(this.url+this.APIkey)
        //     .map(res => res)
        //     .catch(error => Observable.throw(error.json() || 'Server Error'));
    }

    //ritorna i dati APOD di una data specifica già passata convertita
    GetOneDayAPOD(date) {

        let request = this.http.get(this.url+this.APIkey+'&date='+date);
        console.log('New speific http request: ', date, request);

        return this.cache.loadFromObservable(this.url+this.APIkey+'&date='+date, request, this.apodKeys)
            //.catch(error => Observable.throw(error.json() || 'Server Error'));


        // return this.http.get(this.url+this.APIkey+'&date='+date)
        //     .map(res => res)
        //     .catch(error => Observable.throw(error.json() || 'Server Error'));
    }

}
