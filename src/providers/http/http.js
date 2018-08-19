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
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { CacheService } from "ionic-cache";
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpProvider = (function () {
    function HttpProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        this.apodKeys = 'apod-keys-group';
        this.dailyTtl = 60 * 60 * 12; //ttl di 12 ore per le richieste 'today''
        //inizializzo
        //this.data = {};
        this.url = 'https://api.nasa.gov/planetary/apod?api_key=';
        this.APIkey = 'uoEtZqnZxnmcYLuG57SfvvYDu1c5g5kPtJfOSR3S';
    }
    //ritorna i dati APOD del giorno attuale e basta
    HttpProvider.prototype.getAPOD = function (reloadCache) {
        if (reloadCache === void 0) { reloadCache = false; }
        var request = this.http.get(this.url + this.APIkey);
        console.log('New http request: ', request);
        if (reloadCache) {
            console.log('Force reloading cache');
            return this.cache.loadFromDelayedObservable(this.url + this.APIkey, request, this.apodKeys, this.dailyTtl, 'all');
        }
        else {
            return this.cache.loadFromObservable(this.url + this.APIkey, request, this.apodKeys);
        }
        //.catch(error => Observable.throw(error.json() || 'Server Error'));
        // return this.http.get(this.url+this.APIkey)
        //     .map(res => res)
        //     .catch(error => Observable.throw(error.json() || 'Server Error'));
    };
    //ritorna i dati APOD di una data specifica già passata convertita
    HttpProvider.prototype.GetOneDayAPOD = function (date, reloadCache) {
        if (reloadCache === void 0) { reloadCache = false; }
        var request = this.http.get(this.url + this.APIkey + '&date=' + date);
        console.log('New speific http request: ', date, request);
        if (reloadCache) {
            console.log('Force reloading cache');
            return this.cache.loadFromDelayedObservable(this.url + this.APIkey + '&date=' + date, request, this.apodKeys, undefined, 'all');
        }
        else {
            return this.cache.loadFromObservable(this.url + this.APIkey + '&date=' + date, request, this.apodKeys);
        }
        //.catch(error => Observable.throw(error.json() || 'Server Error'));
        // return this.http.get(this.url+this.APIkey+'&date='+date)
        //     .map(res => res)
        //     .catch(error => Observable.throw(error.json() || 'Server Error'));
    };
    HttpProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CacheService])
    ], HttpProvider);
    return HttpProvider;
}());
export { HttpProvider };
//# sourceMappingURL=http.js.map