# Nasa custom APOD app

Android app to browse Nasa's Astro Photo of the Day gallery. This app uses the free accessible [NASA APOD API](https://api.nasa.gov/api.html#apod) to fetch the daily astrophotography of the day in a stylish, minimalist and neat fashion.

### Features

* Open the app and instantly check the last Astro Photo Of the Day
* Navigate back in time and check the APOD for any given day since **June 16 1995**, the date  the first APOD was released from NASA.
* Save your favorite days in your own APOD favorite gallery so you can easily reach them again in the future
* Download any image from the NASA server, built-in download function.
*  Settings to change pages layouts.
* Support for most media featured in the NASA API, including videos, gifs and images.

### Structure

The app primary page is Tabs which allows you to navigate between "Today" and "Past" published APOD images. There's a "Timemachine" page so you can check APOD images from the NASA library since the first published APOD image in the 90s.

* Orange/Yellow rectangles: pages
* Purple hexagons: providers
* Red parallelogram: Plugins/packages
* Pink circle: custom angular component

![Nasa custom APOD app](/doc/Nasa&#32;custom&#32;APOD&#32;app.png)

### Logic

HttpProvider fetches the API for almost all pages, the DownloadProvider manages image downloads and the ToolsProvider offers some methods used from all across the pages and other providers. Finally, the SettingsProvider adds functionality to edit and access user-defined settings, such as pages layout etc.

**Plugins:**

_DomSanitizer_: When a youtube link is fetched we must sanitize the URL otherwise youtube won't allow the video to be played.

_ImageLoader_: Saves images downloaded in the device storage as cache, in case it's necessary again the plugin will load the cached image in no-time instead of fetching the NASA APOD API again.

_photoViewer:_  This Ionic native plugin allows to easily visualize and open in full-screen a clicked image. Used in most pages for this exact reason.

_File_: Used in the download provider to manage downloaded files, moving and renaming them.

**Custom components:**

[_progress bar_](https://www.joshmorony.com/build-a-simple-progress-bar-component-in-ionic-2/): custom component used with the Download Provider to show a dynamic progress bar whenever an user starts downloading a picture.

## Debugging

You can debug on browser or on a real device, I suggest the latter combined with Google's chrome remote developer tools because you'll be able to test Cordova and native plugins/features of your phone and also use the dev tools on the remotely connected browser on your computer to your phone.

* Generally, to build an APK out of a  Ionic project, just use the Ionic+Cordova CLI and then you can manually install and use the apk:

   ```bash
  ionic cordova build android
   ```

   This command will generate the APK file in the  project folder \platforms\android\app\build\outputs\apk\debug\app-debug.apk

### 1. Virtual emulator

[Guide](https://developer.android.com/studio/run/emulator)

1. Start an emulator
   
 ```bash
emulator -avd Nexus_5_API_27
 ```
 
```bash
emulator @Nexus_5_API_27
 ```

2. Check the list of available emulators
   
```bash
adb devices
```

3. Use Ionic CLI + Cordova to build and push the apk in the emulator

```bash
ionic cordova run android --target [device-id]
```

### 2. Real device

[Guide](https://developer.android.com/studio/run/device)

1. Connect your android device to the computer through USB
2. Accept pop-up on device prompting for data transfer
3. Check the unique ID of your device

```bash
adb devices
```

4. Use Ionic CLI + Cordova to build and run the apk in the device

```bash
ionic cordova run android --target [device-id]
```



### 3. Browser	

Browser, cross platform(no cordova):  

```bash
ionic serve
```

If you want to use the lab, which allows you to quickly see all of the different platforms (Android, iOS & Windows phone) at once, use the --lab flag:

```bash
ionic serve --lab
```

### 4. Chrome remote debug

By being logged in in the same Google account and visiting the page **chrome://inspect/#devices**, you can remotely use Google's development tools (F12 with chrome) on a remote location, such as a Ionic app running on a remote device. This allows you to both test Cordova native plugins and functionalities (such as using the real phone hardware characteristics) and your javascript console and network tools exactly as you would do with browser debugging.


## Build

Build an unsigned APK for release:

```bash
ionic cordova build --release android
```

This will create an .apk file in the path *./platforms/android/app/bu
ild/outputs/apk/release/app-release-unsigned.apk*, this .apk is unsigned and still needs this last step before being ready for publishing in the play store.

## Publishing

Ionic official publishing guide (followed this one): 
https://ionicframework.com/docs/v1/guide/publishing.html
Android official apk signing guide: https://developer.android.com/studio/publish/app-signing

1. Generate keystore:

```bash
keytool -genkey -v -keystore nasa-apod.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

This will create a .keystore file, which we will use now to sign the apk file.



2. Sign unsigned apk:


```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore nasa-apod.keystore ./platforms/android/app/bu
ild/outputs/apk/release/app-release-unsigned.apk alias_name
```

3. optimize with zipalign
(Bisogna aggiungere all path zipalign, che si trova sempre in una sottodirectory dell'sdk android, nel mio caso *Users\fil\AppData\Local\Android\Sdk\build-tools\28.0.3\\zipalign.exe*)


```bash
zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk NasaApod.apk
```

## Ionic Dependencies

* [@ionic/storage@2.1.3](https://ionicframework.com/docs/storage/): Save key/data pairs in the device's storage. Used to store all of the app settings, such as chosen page's layout etc.
* [@angular/platform-browser@5.0.3 DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer): Used to safely load youtube videos in case the API is feeding one (the NASA APOD API occasionally feeds different media types such as YouTube links). Used in all the views which load the API: Home, Week, Result and Favorites.
* [ImageLoader@5.0.5](https://www.npmjs.com/package/ionic-image-loader): Allows the use of <img-loader> instead of <img> tags. The new tag will check if a given image has already been saved in the device storage before downloading and loads it from the device if positive, otherwise it just downloads the image. Just my first step towards reducing data usage.
* [cordova-plugin-file@8.x](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/): Cordova plugin to access and interact with the filesystem. (save, delete files)


## Core Dependencies

**Using Ionic 3 and not Ionic 4** because the app would need to be rewritten given the changes in the framework.


* Adb (installed with Android Studio) [link](https://developer.android.com/studio/command-line/adb)

* Node.js: 7.8.0 [link](https://nodejs.org/en/)

* Ionic CLI: 3.8.0 [link](https://ionicframework.com/)

* Cordova: 8.0.0 [link](https://cordova.apache.org/)