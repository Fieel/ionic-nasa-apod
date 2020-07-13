import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloadService } from '../services/download.service';
import { ToolsService } from '../services/tools.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-fullscreen-layout',
  templateUrl: './fullscreen-layout.component.html',
  styleUrls: ['./fullscreen-layout.component.scss'],
})
export class FullscreenLayoutComponent {

  @Input('data') data;

  constructor(
      private sanitizer: DomSanitizer, // x iframe youtube nel caso di video | USATO DIRETTAMENTE NELLA VIEW!
      private download: DownloadService, // x gestire i download | USATO DIRETTAMENTE NELLA VIEW!
      private tools: ToolsService, // x gestire azioni varie | USATO DIRETTAMENTE NELLA VIEW!
      private settings: SettingsService // x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
  ) {
      console.log('FullscreenLayoutComponent loaded: ', this.data);
  }

}
