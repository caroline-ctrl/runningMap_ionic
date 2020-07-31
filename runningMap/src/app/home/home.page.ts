import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dataStorage;
  subscribe;
  locationCoords: any;
  pseudo = null;


  // editMenu$ = new Observable<boolean>(observer => {
  //   this.storage.get('pseudo').then((val) => {
  //     this.pseudo = val;

  //     if (this.pseudo) {
  //       observer.next(false);
  //     } else {
  //       observer.next(true);
  //     }
  //   });
  // });



  constructor(
    private menu: MenuController,
    private storage: Storage,
    public alertController: AlertController,
  ) {}

  ngOnInit(){
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  // deconnexion
  removeDataStorage() {
    this.storage.remove('pseudo');
    this.presentAlert();
    // this.actualyNabBar();
  }


  // actualiser la navbar
  // actualyNabBar() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = (() => {
  //     return false;
  //   });
  //   this.subscribe = this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd){
  //       this.router.navigated = false;
  //     }
  //   });
  // }

  // alert deconnexion
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deconnexion',
      message: 'Vous êtes bien déconnecté',
      buttons: ['OK']
    });
    await alert.present();
  }
}
