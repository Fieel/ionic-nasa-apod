# nasa APOD app

Android app to browse Nasa's Astro Photo of the Day gallery.

## tmp

1. fai partire un emulatore
      
 emulator -avd Nexus_5_API_27

2. lista nomi emulatori in corso
      
adb devices

3. fai partire l'applicaizone ionic sull'emulatore
    
ionic cordova run android --target <nome-emulatore>

## Core Dependencies

* Adb

Used to create virtual android simulators

https://developer.android.com/studio/command-line/adb

* Node.js: 7.8.0

https://nodejs.org/en/

* Ionic CLI: 3.8.0

https://ionicframework.com/

* Cordova: 8.0.0

https://cordova.apache.org/