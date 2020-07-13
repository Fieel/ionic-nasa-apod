import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-timemachine',
  templateUrl: './timemachine.page.html',
  styleUrls: ['./timemachine.page.scss'],
})
export class TimemachinePage  {

  date: any;
  stringDate: string;

  title: string;

  constructor(public navCtrl: NavController,
              private tools: ToolsService) {
      this.title = 'Time Machine';
      this.setTodayDate();
      console.log('TimeMachinePage loaded');
  }

  changePage(){
      console.log('CLICK cambio pagina con data ', this.date);
      if(this.date == undefined){
          console.log('data undefined, settando manualmente ad oggi...');
          this.setTodayDate();
          console.log('...data settata. Nuova data: ', this.date);
      }
      console.log('apertura pagina result...');
      // TODO: implementare navigation verso la pagina di risultato
      // this.navCtrl.push(ResultPage, {date: this.date});
  }

  // in caso non venisse settata dall'utente passo la data di oggi
  setTodayDate(){
      this.date = new Date().getTime();
      this.stringDate = this.tools.formatDate(this.date);
      this.date = this.tools.formatDate(this.date);
  }

}
