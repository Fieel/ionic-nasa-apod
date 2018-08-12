var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//componenti importanti
import { Component } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { NavController } from 'ionic-angular';
//miei provider
import { HttpProvider } from "../../providers/http/http"; //per fare richieste http
import { LoadingProvider } from "../../providers/loading/loading";
import { SettingsProvider } from "../../providers/settings/settings";
import { ToolsProvider } from "../../providers/tools/tools";
import { DownloadProvider } from "../../providers/download/download";
/**
 * Generated class for the WeekPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WeekPage = (function () {
    function WeekPage(HttpProvider, loading, tools, sanitizer, download, navCtrl, settings) {
        this.HttpProvider = HttpProvider;
        this.loading = loading;
        this.tools = tools;
        this.sanitizer = sanitizer;
        this.download = download;
        this.navCtrl = navCtrl;
        this.settings = settings;
        this.orderedData = [];
        //titolo pagina
        // this.titolo = 'Last '+ this.settings.daysInThePast +' days';
        this.titolo = 'Past';
        console.log("WeekPage loaded");
        //setto le variabili con le date
        this.todayDate = new Date();
        this.pastDates = [];
        //inizializzo le variabili che conterranno i dati
        this.data = [];
        //carico i dati nell'array che poi userò nella view
        loading.showLoading();
        this.getAPOD(this.settings.daysInThePast, false);
        loading.hideLoading();
    }
    //meglio rifetchare i dati dallo storage prima di mostrare questa pagine
    //in caso sono cambiati preferiti/daysinthepast...
    WeekPage.prototype.ionViewWillEnter = function () {
        this.settings.fetchStorageData();
    };
    WeekPage.prototype.getAPOD = function (days, refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        //se si tratta di un refresh risetto la data di oggi ad oggi così mi ricarica
        //proprio tutti i giorni da oggi
        if (refresh) {
            console.log("refreshing past data!");
            this.todayDate = new Date();
            this.pastDates = [];
            this.data = [];
        }
        //nel caso contrario riutilizza l'ultima data e carica date sempre più
        //in dietro nel tempo (simulando un comportamento tipo "carica altro...")
        //crea/aggiorna l'array di date passate
        for (var _i = 0; _i < days; _i++) {
            this.pastDates.push(this.todayDate.setDate(this.todayDate.getDate() - 1));
        }
        var _loop_1 = function ($i) {
            this_1.HttpProvider.GetOneDayAPOD(this_1.tools.formatDate(this_1.pastDates[$i]))
                .subscribe(function (data) {
                _this.orderedData[$i] = data;
                _this.data = _this.orderedData.filter(function (item) { return item; });
            });
        };
        var this_1 = this;
        //creo/aggiorno l'array di dati usando le date passate
        for (var $i in this.pastDates) {
            _loop_1($i);
        }
        console.log('date in the past: ', this.pastDates);
    };
    //chiamato durante un refresh
    WeekPage.prototype.doRefresh = function (refresher) {
        console.log('Aggiornamento pagina!');
        this.getAPOD(this.settings.daysInThePast, true);
        console.log('Fine aggiornamento pagina!');
        refresher.complete();
    };
    WeekPage = __decorate([
        Component({
            selector: 'page-week',
            templateUrl: 'week.html',
        }),
        __metadata("design:paramtypes", [HttpProvider,
            LoadingProvider,
            ToolsProvider,
            DomSanitizer,
            DownloadProvider,
            NavController,
            SettingsProvider])
    ], WeekPage);
    return WeekPage;
}());
export { WeekPage };
//# sourceMappingURL=week.js.map