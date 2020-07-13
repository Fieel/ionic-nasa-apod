import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
// import 'rxjs/Rx';


@Injectable({ providedIn: 'root' })
export class HttpService {
 // per la logica interna
 url: string;
 // data: any;
 // urlCambiato: boolean;
 APIkey: string;

 apod: Observable<any>;
 apodKeys = 'apod-keys-group';
 dailyTtl = 60 * 60 * 12; // ttl di 12 ore per le richieste 'today''

 constructor(
   public http: HttpClient,
   public cache: CacheService
   ) {
     // inizializzo
     // this.data = {};
     this.url = 'https://api.nasa.gov/planetary/apod?api_key=';
     this.APIkey = 'uoEtZqnZxnmcYLuG57SfvvYDu1c5g5kPtJfOSR3S';
 }

 // ritorna i dati APOD del giorno attuale e basta
 getAPOD(reloadCache: boolean = false) {
     let request = this.http.get(this.url + this.APIkey);
     console.log('New http request: ', request);

     if (reloadCache){
        console.log('Force reloading cache');
        return this.cache.loadFromDelayedObservable(this.url + this.APIkey, request, this.apodKeys, this.dailyTtl, 'all');
     }else{
        return this.cache.loadFromObservable(this.url + this.APIkey, request, this.apodKeys);
     }
 }

 // ritorna i dati APOD di una data specifica già passata convertita
 GetOneDayAPOD(date, reloadCache: boolean = false) {

     let request = this.http.get(this.url + this.APIkey + '&date=' + date);
     console.log('New speific http request: ', date, request);

     if (reloadCache){
         console.log('Force reloading cache');
         return this.cache.loadFromDelayedObservable(this.url+this.APIkey+'&date='+date, request, this.apodKeys, undefined, 'all');
     }else{
         return this.cache.loadFromObservable(this.url+this.APIkey+'&date='+date, request, this.apodKeys);
     }


         // .catch(error => Observable.throw(error.json() || 'Server Error'));


     // return this.http.get(this.url+this.APIkey+'&date='+date)
     //     .map(res => res)
     //     .catch(error => Observable.throw(error.json() || 'Server Error'));
 }

}
