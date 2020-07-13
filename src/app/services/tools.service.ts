import { Injectable } from '@angular/core';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { ToastController } from 'ionic-angular';

@Injectable({
  providedIn: "root",
})
export class ToolsService {
  constructor(
    private photoViewer: PhotoViewer,
    // private toastCtrl: ToastController
  ) {}

  //apre l'immagine cliccata in fullscreen
  showFullScreenImage(hdurl) {
    this.photoViewer.show(hdurl);
  }

  //Estrae l'ID di un video dal proprio URL di youtube così da prenderne la thumbnail
  //da mostrare come thumbnail al posto dell'immagine
  getYoutubeVideoId(youtubeUrl: string) {
    // console.log('url youtube: ', youtubeUrl);
    // console.log('substringa test ', youtubeUrl.substr(0,23));

    //solo se si tratta di un link di youtube..
    if (youtubeUrl.substr(0, 23) == "https://www.youtube.com") {
      //estrazione
      let videoId = youtubeUrl.match("d\\/(\\w+)\\?rel=\\d+");

      // console.log('id estratto: ', videoId);
      // console.log('url thumbnail: ', 'https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg');

      if (videoId == null) {
        // console.log('videoId is null');
        return "assets/imgs/no-thumb.png";
      } else {
        // console.log('videoId is NOT null');
        return "https://img.youtube.com/vi/" + videoId[1] + "/hqdefault.jpg";
      }
    } else {
      // console.log('Non un link di youtube!!');
      return "assets/imgs/no-thumb.png";
    }
  }

  //Formatta date da SECONDI a YYYY-MM-DD
  public formatDate(date: number): string {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  public presentToast(
    msg: string,
    duration: number,
    position: string = "bottom"
  ) {
    // let toast = this.toastCtrl.create({
    //   message: msg,
    //   duration: duration,
    //   position: position,
    // });

    // toast.onDidDismiss(() => {
    //   console.log("Dismissed toast, content:" + msg);
    // });

    // toast.present();
  }
}
