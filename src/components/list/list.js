var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ToolsProvider } from "../../providers/tools/tools";
import { ResultPage } from "../../pages/result/result";
import { NavController } from "ionic-angular";
/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ListComponent = (function () {
    function ListComponent(tools, navCtrl) {
        this.tools = tools;
        this.navCtrl = navCtrl;
        console.log('ListComponent loaded: ', this.data, this.layout);
    }
    ListComponent.prototype.changePage = function (date) {
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, { date: date });
    };
    __decorate([
        Input('layout'),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "layout", void 0);
    __decorate([
        Input('data'),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "data", void 0);
    ListComponent = __decorate([
        Component({
            selector: 'list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [ToolsProvider,
            NavController])
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.js.map