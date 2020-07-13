import { Component, Input } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss'],
})
export class CardLayoutComponent {

  @Input('data') data;

  constructor(
      private sanitizer: DomSanitizer, // x iframe youtube nel caso di video | USATO DIRETTAMENTE NELLA VIEW!
      private download: DownloadService, // x gestire i download | USATO DIRETTAMENTE NELLA VIEW!
      private tools: ToolsService, // x gestire azioni varie | USATO DIRETTAMENTE NELLA VIEW!
      private settings: SettingsService // x gestire variabili globali | USATO DIRETTAMENTE NELLA VIEW!
     ) {
    console.log('CardLayoutComponent loaded: ', this.data);
  }
}
