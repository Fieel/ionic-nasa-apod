import { Component, Input } from '@angular/core';
import { ToolsService } from '../services/tools.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

    //layout dalle view
    @Input('layout') layout;
    @Input('data') data;

  constructor(
      private tools: ToolsService,
      private navCtrl: NavController,
  ) {
      console.log('ListComponent loaded: ', this.data, this.layout);

  }
    changePage(date){
        console.log('apertura pagina result...');
        // TODO: implementare navigazione verso la prossima pagina di dettaglio
        // this.navCtrl.push(ResultPage, {date: date});
    }
}
