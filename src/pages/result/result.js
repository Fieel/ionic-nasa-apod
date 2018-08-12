var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { LoadingProvider } from "../../providers/loading/loading";
import { SettingsProvider } from "../../providers/settings/settings";
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResultPage = (function () {
    function ResultPage(navParams, HttpProvider, loading, settings) {
        this.navParams = navParams;
        this.HttpProvider = HttpProvider;
        this.loading = loading;
        this.settings = settings;
        this.pageTitle = "Result";
        this.date = navParams.get('date');
        console.log('data input: ', this.date);
        this.data = {};
        loading.showLoading();
        this.getAPOD(this.date);
        this.dataLength = Object.keys(this.data).length;
        loading.hideLoading();
        console.log("ResultPage loaded");
    }
    //chiamato durante un refresh
    // doRefresh(refresher) {
    //     console.log('Aggiornamento pagina!');
    //     this.getAPOD(this.date);
    //     console.log('Fine aggiornamento pagina!');
    //     refresher.complete();
    // }
    ResultPage.prototype.getAPOD = function (date) {
        var _this = this;
        this.HttpProvider.GetOneDayAPOD(date)
            .subscribe(function (data) {
            _this.data = data;
            _this.dataLength = Object.keys(_this.data).length;
        });
    };
    ResultPage = __decorate([
        Component({
            selector: 'page-result',
            templateUrl: 'result.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            HttpProvider,
            LoadingProvider,
            SettingsProvider])
    ], ResultPage);
    return ResultPage;
}());
export { ResultPage };
//# sourceMappingURL=result.js.map