//core stuff
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';//x il DOM Sanitizer usato nel link di youtube
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { File } from '@ionic-native/file';//usato per i download
import { IonicStorageModule } from '@ionic/storage';//usato per salvare key/data pairs nello storage del telefono

//pagine
import { HomePage } from '../pages/home/home';
import { WeekPage } from '../pages/week/week';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from "../pages/about/about";
import { TimemachinePage } from "../pages/timemachine/timemachine";
import { ResultPage } from "../pages/result/result";
import { SettingsPage } from "../pages/settings/settings";
import { FavouritesPage } from "../pages/favourites/favourites";

//componenti automatici
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//miei provider ionic g provider <*nome*>
import { HttpProvider } from '../providers/http/http';//gestisce le chiamate http all'API
import { LoadingProvider } from '../providers/loading/loading';//mostra/nasconde popup di loading
import { SettingsProvider } from '../providers/settings/settings';//gestisce lo storage, preferiti, layout di pagine e le altre settings
import { DownloadProvider } from '../providers/download/download';//
import { ToolsProvider } from '../providers/tools/tools';

//importati da me per offrire funzionalità a più pagine
import { HttpClientModule } from "@angular/common/http";//importato nell'HttpProvider per far chiamate http
import { PhotoViewer } from '@ionic-native/photo-viewer';//importato nelle pagine per aprire immagini a schermo intero
    //https://ionicframework.com/docs/native/photo-viewer/
import { DatePicker } from '@ionic-native/date-picker';
    //https://ionicframework.com/docs/native/date-picker/
import { IonicImageLoader } from 'ionic-image-loader';
    //https://www.npmjs.com/package/ionic-image-loader
// import { FileOpener } from '@ionic-native/file-opener';
    //https://ionicframework.com/docs/native/file-opener/
import { CacheModule } from 'ionic-cache';
    //https://www.npmjs.com/package/ionic-cache

//componenti custom creati da me
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { CardLayoutComponent } from "../components/card-layout/card-layout";
import { FullscreenLayoutComponent } from "../components/fullscreen-layout/fullscreen-layout";
import { ListComponent } from "../components/list/list";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        WeekPage,
        AboutPage,
        TimemachinePage,
        ResultPage,
        SettingsPage,
        FavouritesPage,
        ProgressBarComponent,
        CardLayoutComponent,
        FullscreenLayoutComponent,
        ListComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicImageLoader.forRoot(),
        IonicStorageModule.forRoot(),
        CacheModule.forRoot({ keyPrefix: 'APICallsCacher' })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        WeekPage,
        AboutPage,
        TimemachinePage,
        ResultPage,
        SettingsPage,
        FavouritesPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpProvider,
        LoadingProvider,
        PhotoViewer,
        DatePicker,
        File,
        SettingsProvider,
        DownloadProvider,
    ToolsProvider,
    ToolsProvider,
        // FileOpener
    ]
})
export class AppModule {}
