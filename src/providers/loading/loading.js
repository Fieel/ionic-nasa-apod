var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LoadingProvider = (function () {
    function LoadingProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
    }
    //mostra pop-up
    LoadingProvider.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Gathering data from across the universe...!'
        });
        this.loading.present(); //Mostra il messaggio
    };
    //nasconde pop-up
    LoadingProvider.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    LoadingProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoadingController])
    ], LoadingProvider);
    return LoadingProvider;
}());
export { LoadingProvider };
//# sourceMappingURL=loading.js.map