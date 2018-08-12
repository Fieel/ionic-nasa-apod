var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
var SettingsProvider = (function () {
    function SettingsProvider(storage, alertCtrl) {
        var _this = this;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        //creo un osservabile che contiene il tema attuale
        this.theme = new BehaviorSubject('dark-theme');
        this.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
    }
    //
    // THEMING
    //
    SettingsProvider.prototype.setActiveTheme = function () {
        console.log('setActiveTheme ative ');
        if (this.selectedTheme === 'light-theme') {
            this.theme.next('dark-theme');
            console.log('light->dark');
        }
        else {
            this.theme.next('light-theme');
            console.log('dark->light');
        }
        console.log('tema corrente: ', this.selectedTheme);
    };
    SettingsProvider.prototype.getActiveTheme = function () {
        return this.theme.asObservable();
    };
    /* STORAGE */
    //ripulisce tutti i dati salvati nella memoria del telefono
    //preferiti, settings varie etc...
    SettingsProvider.prototype.clearStorage = function () {
        var _this = this;
        this.storage.clear().then(function (data) {
            var alert = _this.alertCtrl.create({
                title: 'Storage cleared',
                subTitle: 'All app data has been wiped from the device',
                buttons: ['Dismiss']
            });
            alert.present();
            console.log('Storage cleared!');
        });
    };
    //prendo i dati dallo storage e li salvo nelle variabili che userà l'app
    //per tutta la sua logica durante il funzionamento.
    SettingsProvider.prototype.fetchStorageData = function () {
        /* ================================= */
        /* FETCH DAYSINTHEPAST x pagina week */
        /* ================================= */
        var _this = this;
        //controllo che sia gia stata settata la key nel local storage
        //se è già stata settata la carico
        //se no la imposto a un valore di default
        this.storage.get('daysInThePast').then(function (data) {
            if (data) {
                _this.daysInThePast = data;
                console.log("daysInThePastt caricati!", _this.daysInThePast);
            }
            else {
                _this.daysInThePast = 7;
            }
        });
        /* =============== */
        /* FETCH PREFERITI */
        /* =============== */
        //idem per i preferiti
        this.storage.get('favourites').then(function (data) {
            if (data) {
                _this.favourites = data;
                console.log("Preferiti caricati!", _this.favourites);
            }
            else {
                _this.favourites = [];
            }
        });
        /* ============================ */
        /* FETCH SETTINGS LAYOUT PAGINE */
        /* ============================ */
        //setta i layout di visualizzazione di default
        this.storage.get('todayLayout').then(function (data) {
            if (data) {
                _this.todayLayout = data;
                console.log("Layout pagina today caricato dallo storage!", _this.todayLayout);
            }
            else {
                _this.todayLayout = "card";
                _this.storage.set('todayLayout', _this.todayLayout);
                console.log("Layout pagina today inizializzata: ", _this.todayLayout);
            }
        });
        //setta i layout di visualizzazione di default
        this.storage.get('weekLayout').then(function (data) {
            if (data) {
                _this.weekLayout = data;
                console.log("Layout pagina week caricato dallo storage!", _this.weekLayout);
            }
            else {
                _this.weekLayout = "card";
                _this.storage.set('weekLayout', _this.weekLayout);
                console.log("Layout pagina today inizializzata: ", _this.weekLayout);
            }
        });
        //setta i layout di visualizzazione di default
        this.storage.get('resultLayout').then(function (data) {
            if (data) {
                _this.resultLayout = data;
                console.log("Layout pagina result caricato dallo storage!", _this.resultLayout);
            }
            else {
                _this.resultLayout = "card";
                _this.storage.set('resultLayout', _this.resultLayout);
                console.log("Layout pagina result inizializzata: ", _this.resultLayout);
            }
        });
        //setta i layout di visualizzazione di default
        this.storage.get('favouritesLayout').then(function (data) {
            if (data) {
                _this.favouritesLayout = data;
                console.log("Layout pagina favourites caricato dallo storage!", _this.favouritesLayout);
            }
            else {
                _this.favouritesLayout = "grid";
                _this.storage.set('favouritesLayout', _this.favouritesLayout);
                console.log("Layout pagina favourites inizializzata: ", _this.favouritesLayout);
            }
        });
    };
    //serve per aggiornare le impostazioni nello storage quando si lascia
    //la pagina delle settings dopo averle modificate.
    SettingsProvider.prototype.updateStorageData = function () {
        console.log("update dei dati nello storage in corso!");
        this.storage.set('todayLayout', this.todayLayout);
        this.storage.set('weekLayout', this.weekLayout);
        this.storage.set('resultLayout', this.resultLayout);
        this.storage.set('favouritesLayout', this.favouritesLayout);
    };
    /* PREFERITI */
    //GESTIONE ASYNC DATI/VIEW
    //ritorna vero o falso in base al fatto che i dati si sono già caricati,
    //serve alle view per non crashare siccome si caricano più in fretta di quanto
    //si inizializzino le variabili lol.
    SettingsProvider.prototype.checkIfFavouritesAreAvailable = function () {
        if (this.favourites === undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    SettingsProvider.prototype.checkIfAlreadyFavourite = function (date) {
        console.log('Controllo preferiti...');
        for (var _i = 0, _a = this.favourites; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.date == date) {
                return true;
            }
        }
        return false;
    };
    //Aggiunge all'array dei preferiti una nuova voce
    SettingsProvider.prototype.addToFavourites = function (data) {
        //FUNZIONA! Aggiungere il controllo se è già stato aggiunto ai preferiti
        //non ti permette di farlo ancora ma esce un messaggio (o magari non viene
        //renderizzato del tutto il tasto sulla carta direttamente nella view)?
        console.log("Aggiunto nuovo preferito: ", data);
        this.favourites.push(data);
        this.storage.set('favourites', this.favourites);
        var alert = this.alertCtrl.create({
            title: data.title,
            subTitle: 'This picture has just been added to your favorites\' collection!',
            buttons: ['Thanks.']
        });
        alert.present();
        console.log('Storage ripulito totalmente!');
    };
    //rimuove dagli array dei preferiti una voce specifica basandosi sulla stringa
    //che rappresenta la data per fare il controllo if.
    SettingsProvider.prototype.removeFromFavourites = function (data) {
        //filtra via l'oggetto che come data ha quella passata come parametro.
        this.favourites = this.favourites.filter(function (item) { return item.date !== data.date; });
        this.storage.set('favourites', this.favourites);
        console.log('Rimosso dai preferiti: ', data);
        var alert = this.alertCtrl.create({
            title: data.title,
            subTitle: 'Picture succesfully removed from your favorites collection.',
            buttons: ['Ok.']
        });
        alert.present();
    };
    /* SETTINGS VARIE */
    //gestisce la variabile giorniNelPassato aumentandola/diminuendola e salvando
    //il nuovo valore nello storage del telefono.
    SettingsProvider.prototype.increaseDays = function () {
        this.daysInThePast++;
        this.storage.set('daysInThePast', this.daysInThePast);
    };
    SettingsProvider.prototype.decreaseDays = function () {
        this.daysInThePast--;
        this.storage.set('daysInThePast', this.daysInThePast);
    };
    SettingsProvider.prototype.setPageLayout = function (page, newLayout) {
        /* layouts: */
        //card
        //grid
        /* defaults: */
        //todayPage = card
        //weekPage = card
        //resultPage = card
        //favouritesPage = grid
        switch (page) {
            case 'today': {
                this.storage.set('todayLayout', newLayout);
                console.log("Cambiato layout:", page, newLayout);
                break;
            }
            case 'week': {
                this.storage.set('weekLayout', newLayout);
                console.log("Cambiato layout:", page, newLayout);
                break;
            }
            case 'result': {
                this.storage.set('resultLayout', newLayout);
                console.log("Cambiato layout:", page, newLayout);
                break;
            }
            case 'favourites': {
                this.storage.set('favouritesLayout', newLayout);
                console.log("Cambiato layout:", page, newLayout);
                break;
            }
        }
    };
    SettingsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage,
            AlertController])
    ], SettingsProvider);
    return SettingsProvider;
}());
export { SettingsProvider };
//# sourceMappingURL=settings.js.map