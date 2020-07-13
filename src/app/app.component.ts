import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CacheService } from 'ionic-cache';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // tema in uso
  selectedTheme: string;

  navigate: any;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private settings: SettingsService,
    cache: CacheService
  ) {
    // Load sideMenu object
    this.sideMenu();

    // osservabile da fetchare che aggiorna il tema in uso perennemente
    // https://www.youtube.com/watch?v=GgYfGHG7bQc
    this.settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));

    console.log('DEBUG  app.component selectedTheme', this.selectedTheme);

    this.initializeApp(cache, statusBar, settings, splashScreen);
  }

  // Setup the application at startup
  initializeApp(cache, statusBar, settings, splashscreen) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // CACHING
      // Set TTL to 1 week
      cache.setDefaultTTL(60 * 60 * 24 * 7);
      // Keep our cached results when device is offline
      cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      splashscreen.hide();

      settings.fetchStorageData();
    });
  }

  // Setup the side menu at startup
  sideMenu() {
    this.navigate = [
      {
        title: 'Today',
        url: '/home',
      },
      {
        title: 'Time machine',
        url: '/timemachine',
      },
      {
        title: 'Favourites',
        url: '/favourites',
      },
      {
        title: 'Settings',
        url: '/settings',
      },
      {
        title: 'About',
        url: '/about',
      }
    ];
  }
}
