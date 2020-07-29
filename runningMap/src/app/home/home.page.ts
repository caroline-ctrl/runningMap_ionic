import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dataStorage;
  subscribe;
  locationCoords: any;

  constructor(
    private menu: MenuController,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
  ) {}

  ngOnInit(){
    this.storage.get('pseudo').then(val => {
      this.dataStorage = val;
    });
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  // deconnexion
  removeDataStorage() {
    this.storage.remove('pseudo');
    this.presentAlert();
    this.actualyNabBar();
  }


  // actualiser la navbar
  actualyNabBar() {
    this.router.routeReuseStrategy.shouldReuseRoute = (() => {
      return false;
    });
    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.router.navigated = false;
      }
    });
  }

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
