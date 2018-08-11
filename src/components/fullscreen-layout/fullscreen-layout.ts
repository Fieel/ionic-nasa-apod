import {Component, Input} from '@angular/core';
import {DownloadProvider} from "../../providers/download/download";
import {DomSanitizer} from "@angular/platform-browser";
import {ToolsProvider} from "../../providers/tools/tools";
import {SettingsProvider} from "../../providers/settings/settings";

/**
 * Generated class for the FullscreenLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fullscreen-layout',
  templateUrl: 'fullscreen-layout.html'
})
export class FullscreenLayoutComponent {

    @Input('data') data;

  constructor(
      private sanitizer: DomSanitizer,//x iframe youtube nel caso di video | USATO DIRETTAMENTE NELLA VIEW!
      private download: DownloadProvider,//x gestire i download | USATO DIRETTAMENTE NELLA VIEW!
      private tools: ToolsProvider,//x gestire azioni varie | USATO DIRETTAMENTE NELLA VIEW!
      private settings: SettingsProvider//x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
  ) {
      console.log('FullscreenLayoutComponent: ', this.data);
  }

}
