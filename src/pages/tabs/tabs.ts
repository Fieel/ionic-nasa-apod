import { Component } from '@angular/core';

import { WeekPage } from '../week/week';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = WeekPage;

  constructor() {

      console.log("TabsPage loaded");
  }
}
