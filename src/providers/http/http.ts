import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
    //per la logica interna
    url: string;
    data: any;
    // urlCambiato: boolean;
    APIkey: string;

    constructor(public http: HttpClient) {
        //inizializzo
        this.url = '';
        this.data = {};
        this.APIkey = 'uoEtZqnZxnmcYLuG57SfvvYDu1c5g5kPtJfOSR3S';
    }

    //ritorna i dati APOD del giorno attuale e basta
    getAPOD() {
        return this.http.get('https://api.nasa.gov/planetary/apod?api_key='+this.APIkey)
            .map(res => res)
            .catch(error => Observable.throw(error.json() || 'Server Error'));
    }

    //ritorna i dati APOD di una data specifica già passata convertita
    GetOneDayAPOD(date) {
        return this.http.get('https://api.nasa.gov/planetary/apod?api_key='+this.APIkey+'&date='+date)
            .map(res => res)
            .catch(error => Observable.throw(error.json() || 'Server Error'));
    }


}
