//componenti
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImageLoaderConfig } from "ionic-image-loader";
import { CacheService } from "ionic-cache";

//pagine
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage} from "../pages/about/about";
import { TimemachinePage } from "../pages/timemachine/timemachine";
import { SettingsPage } from "../pages/settings/settings";
import { FavouritesPage } from "../pages/favourites/favourites";

//provider
import {SettingsProvider} from "../providers/settings/settings";

declare var cordova: any;
declare var imagesaver: any;
declare var window: any;

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    rootPage:any = TabsPage;

    //tema in uso
    selectedTheme: string;

    @ViewChild(Nav) private nav: Nav;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private imageLoaderConfig: ImageLoaderConfig,
                private settings: SettingsProvider,
                cache: CacheService) {

        //osservabile da fetchare che aggiorna il tema in uso
        // https://www.youtube.com/watch?v=GgYfGHG7bQc
        this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            //CACHING
            // Set TTL to 12h
            cache.setDefaultTTL(60 * 60 * 12);
            // Keep our cached results when device is offline!
            cache.setOfflineInvalidate(false);

            statusBar.styleDefault();
            // splashScreen.hide();


            this.settings.fetchStorageData();
        });
    }

    public openHomePage() {
        this.nav.setRoot(TabsPage);
    }
    public openTimemachinePage() {
        this.nav.push(TimemachinePage);
    }
    public openFavouritesPage() {
        this.nav.push(FavouritesPage);
    }
    public openSettingsPage() {
        this.nav.setRoot(SettingsPage);
    }
    public openAboutPage() {
        this.nav.push(AboutPage);
    }
    
}
