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
import { NavController } from 'ionic-angular';
import { ResultPage } from "../result/result";
import { HttpProvider } from "../../providers/http/http";
/**
 * Generated class for the TimemachinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TimemachinePage = (function () {
    function TimemachinePage(navCtrl, httpProvider) {
        this.navCtrl = navCtrl;
        this.httpProvider = httpProvider;
        this.title = "Time Machine";
        this.setTodayDate();
    }
    TimemachinePage.prototype.changePage = function () {
        console.log('CLICK cambio pagina con data ', this.date);
        if (this.date == undefined) {
            console.log('data undefined, settando manualmente ad oggi...');
            this.setTodayDate();
            console.log('...data settata. Nuova data: ', this.date);
        }
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, { date: this.date });
    };
    //in caso non venisse settata dall'utente passo la data di oggi
    TimemachinePage.prototype.setTodayDate = function () {
        this.date = new Date().getTime();
        this.stringDate = this.httpProvider.formatDate(this.date);
        this.date = this.httpProvider.formatDate(this.date);
    };
    TimemachinePage = __decorate([
        Component({
            selector: 'page-timemachine',
            templateUrl: 'timemachine.html',
        }),
        __metadata("design:paramtypes", [NavController,
            HttpProvider])
    ], TimemachinePage);
    return TimemachinePage;
}());
export { TimemachinePage };
//# sourceMappingURL=timemachine.js.map