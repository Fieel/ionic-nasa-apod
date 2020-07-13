// Core stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

// Packages
import { CacheModule } from 'ionic-cache';
import { IonicImageLoader } from 'ionic-image-loader';

// Native plugins
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

// Services
import { HttpService } from './services/http.service';
import { SettingsService } from './services/settings.service';
import { ToolsService } from './services/tools.service';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CacheModule.forRoot({ keyPrefix: 'APOD' }),
    IonicImageLoader.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpService,
    SettingsService,
    ToolsService,
    WebView,
    PhotoViewer,
    File,
    Base64,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
