import {Component, Input} from '@angular/core';
import {ToolsProvider} from "../../providers/tools/tools";
import {ResultPage} from "../../pages/result/result";
import {NavController} from "ionic-angular";

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent {

    //layout dalle view
    @Input('layout') layout;
    @Input('data') data;


  constructor(
      private tools: ToolsProvider,
      private navCtrl: NavController,
  ) {
      console.log('ListComponent loaded: ', this.data, this.layout);

  }
    changePage(date){
        console.log('apertura pagina result...');
        this.navCtrl.push(ResultPage, {date: date});
    }
}
