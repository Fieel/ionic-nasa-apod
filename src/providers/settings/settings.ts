import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Injectable()
export class SettingsProvider {
    public daysInThePast: number;
    public favourites: any[];

    public todayLayout: string;
    public weekLayout: string;
    public resultLayout: string;
    public favouritesLayout: string;

    constructor(private storage: Storage,
                private alertCtrl: AlertController) {
    }


    /* STORAGE */


    //ripulisce tutti i dati salvati nella memoria del telefono
    //preferiti, settings varie etc...
    public clearStorage(){
        this.storage.clear().then( data => {
            let alert = this.alertCtrl.create({
                title: 'Storage cleared',
                subTitle: 'All app data has been wiped from the device',
                buttons: ['Dismiss']
            });
            alert.present();
            console.log('Storage cleared!');
        });
    }
    //prendo i dati dallo storage e li salvo nelle variabili che userà l'app
    //per tutta la sua logica durante il funzionamento.
    public fetchStorageData(){



        /* ================================= */
        /* FETCH DAYSINTHEPAST x pagina week */
        /* ================================= */


        //controllo che sia gia stata settata la key nel local storage
        //se è già stata settata la carico
        //se no la imposto a un valore di default
        this.storage.get('daysInThePast').then(data=> {
            if (data) {
                this.daysInThePast = data;
                console.log("daysInThePastt caricati!", this.daysInThePast)
            } else {
                this.daysInThePast = 7;
            }});



        /* =============== */
        /* FETCH PREFERITI */
        /* =============== */


        //idem per i preferiti
        this.storage.get('favourites').then(data=> {
            if (data) {
                this.favourites = data;
                console.log("Preferiti caricati!", this.favourites)
            } else {
                this.favourites = [];
            }});



        /* ============================ */
        /* FETCH SETTINGS LAYOUT PAGINE */
        /* ============================ */


        //setta i layout di visualizzazione di default
        this.storage.get('todayLayout').then(data=> {
            if (data) {
                this.todayLayout = data;
                console.log("Layout pagina today caricato dallo storage!", this.todayLayout);
            } else {
                this.todayLayout = "card";
                this.storage.set('todayLayout', this.todayLayout);
                console.log("Layout pagina today inizializzata: ", this.todayLayout);
            }});
        //setta i layout di visualizzazione di default
        this.storage.get('weekLayout').then(data=> {
            if (data) {
                this.weekLayout = data;
                console.log("Layout pagina week caricato dallo storage!", this.weekLayout);
            } else {
                this.weekLayout = "card";
                this.storage.set('weekLayout', this.weekLayout);
                console.log("Layout pagina today inizializzata: ", this.weekLayout);
            }});
        //setta i layout di visualizzazione di default
        this.storage.get('resultLayout').then(data=> {
            if (data) {
                this.resultLayout = data;
                console.log("Layout pagina result caricato dallo storage!", this.resultLayout);
            } else {
                this.resultLayout = "card";
                this.storage.set('resultLayout', this.resultLayout);
                console.log("Layout pagina result inizializzata: ", this.resultLayout);
            }});
        //setta i layout di visualizzazione di default
        this.storage.get('favouritesLayout').then(data=> {
            if (data) {
                this.favouritesLayout = data;
                console.log("Layout pagina favourites caricato dallo storage!", this.favouritesLayout);
            } else {
                this.favouritesLayout = "grid";
                this.storage.set('favouritesLayout', this.favouritesLayout);
                console.log("Layout pagina favourites inizializzata: ", this.favouritesLayout);
            }});
    }
    //serve per aggiornare le impostazioni nello storage quando si lascia
    //la pagina delle settings dopo averle modificate.
    public updateStorageData(){
        console.log("update dei dati nello storage in corso!");
        this.storage.set('todayLayout', this.todayLayout);
        this.storage.set('weekLayout', this.weekLayout);
        this.storage.set('resultLayout', this.resultLayout);
        this.storage.set('favouritesLayout', this.favouritesLayout);
    }

    /* PREFERITI */


    //Aggiunge all'array dei preferiti una nuova voce
    public addToFavourites(data){
        //FUNZIONA! Aggiungere il controllo se è già stato aggiunto ai preferiti
        //non ti permette di farlo ancora ma esce un messaggio (o magari non viene
        //renderizzato del tutto il tasto sulla carta direttamente nella view)?
        console.log("Aggiunto nuovo preferito: ", data);
        this.favourites.push(data);
        this.storage.set('favourites', this.favourites);
        let alert = this.alertCtrl.create({
            title: data.title,
            subTitle: 'This picture has just been added to your favorites\' collection!',
            buttons: ['Thanks.']
        });
        alert.present();
        console.log('Storage ripulito totalmente!');

    }
    //rimuove dagli array dei preferiti una voce specifica basandosi sulla stringa
    //che rappresenta la data per fare il controllo if.
    public removeFromFavourites(data){
        //filtra via l'oggetto che come data ha quella passata come parametro.
        this.favourites = this.favourites.filter(item => item.date !== data.date);
        this.storage.set('favourites', this.favourites);

        console.log('Rimosso dai preferiti: ', data);
        let alert = this.alertCtrl.create({
            title: data.title,
            subTitle: 'Picture succesfully removed from your favorites collection.',
            buttons: ['Ok.']
        });
        alert.present();
    }


    /* SETTINGS VARIE */


    //gestisce la variabile giorniNelPassato aumentandola/diminuendola e salvando
    //il nuovo valore nello storage del telefono.
    public increaseDays(){
        this.daysInThePast++;
        this.storage.set('daysInThePast', this.daysInThePast);
    }
    public decreaseDays(){
        this.daysInThePast--;
        this.storage.set('daysInThePast', this.daysInThePast);
    }

    public setPageLayout(page: string, newLayout: string): void{

        /* layouts: */
        //card
        //grid

        /* defaults: */
        //todayPage = card
        //weekPage = card
        //resultPage = card
        //favouritesPage = grid


        switch(page) {
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
    }

}
