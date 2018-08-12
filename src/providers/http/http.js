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
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { CacheService } from 'ionic-cache';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HttpProvider = (function () {
    function HttpProvider(http, cache) {
        this.http = http;
        this.cache = cache;
        //inizializzo
        this.data = {};
        this.APIkey = 'uoEtZqnZxnmcYLuG57SfvvYDu1c5g5kPtJfOSR3S';
        this.url = 'https://api.nasa.gov/planetary/apod?api_key=' + this.APIkey;
    }
    //ritorna i dati APOD del giorno attuale e basta
    HttpProvider.prototype.getAPOD = function () {
        return this.http.get('https://api.nasa.gov/planetary/apod?api_key=' + this.APIkey)
            .map(function (res) { return res; })
            .catch(function (error) { return Observable.throw(error.json() || 'Server Error'); });
    };
    //ritorna i dati APOD di una data specifica già passata convertita
    HttpProvider.prototype.GetOneDayAPOD = function (date) {
        return this.http.get('https://api.nasa.gov/planetary/apod?api_key=' + this.APIkey + '&date=' + date)
            .map(function (res) { return res; })
            .catch(function (error) { return Observable.throw(error.json() || 'Server Error'); });
    };
    HttpProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, CacheService])
    ], HttpProvider);
    return HttpProvider;
}());
export { HttpProvider };
//# sourceMappingURL=http.js.map