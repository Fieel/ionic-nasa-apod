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
import { DownloadProvider } from "../../providers/download/download";
import { DomSanitizer } from "@angular/platform-browser";
import { ToolsProvider } from "../../providers/tools/tools";
import { SettingsProvider } from "../../providers/settings/settings";
/**
 * Generated class for the FullscreenLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var FullscreenLayoutComponent = (function () {
    function FullscreenLayoutComponent(sanitizer, //x iframe youtube nel caso di video | USATO DIRETTAMENTE NELLA VIEW!
        download, //x gestire i download | USATO DIRETTAMENTE NELLA VIEW!
        tools, //x gestire azioni varie | USATO DIRETTAMENTE NELLA VIEW!
        settings //x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
    ) {
        this.sanitizer = sanitizer;
        this.download = download;
        this.tools = tools;
        this.settings = settings; //x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
        console.log('FullscreenLayoutComponent loaded: ', this.data);
    }
    __decorate([
        Input('data'),
        __metadata("design:type", Object)
    ], FullscreenLayoutComponent.prototype, "data", void 0);
    FullscreenLayoutComponent = __decorate([
        Component({
            selector: 'fullscreen-layout',
            templateUrl: 'fullscreen-layout.html'
        }),
        __metadata("design:paramtypes", [DomSanitizer,
            DownloadProvider,
            ToolsProvider,
            SettingsProvider //x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
        ])
    ], FullscreenLayoutComponent);
    return FullscreenLayoutComponent;
}());
export { FullscreenLayoutComponent };
//# sourceMappingURL=fullscreen-layout.js.map