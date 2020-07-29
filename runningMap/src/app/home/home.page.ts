import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ]
})
export class HomePage implements OnInit {
  dataStorage;
  subscribe;

  constructor(
    private menu: MenuController,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy
  ) {}

  ngOnInit() {
    this.storage.get('pseudo').then((val) => {
      this.dataStorage = val;
    });

    this.checkGPSPermission();
    this.requestGPSPermission();
    this.askToTurnOnGPS();
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
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.subscribe = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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
      buttons: [ 'OK' ]
    });
    await alert.present();
  }

  // Verifie si permission acces GPS
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      .then(
        (result) => {
          if (result.hasPermission) {
            this.askToTurnOnGPS();
          } else {
            this.requestGPSPermission();
          }
        },
        (err) => {
          alert(err);
        }
      );
  }

  // Obtenir l'autorisation de localisation de l'utilisateur
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.locationAccuracy
          .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
          .then(() => {
            console.log('success'), (err) => console.log(err);
          });
      } else {
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              this.askToTurnOnGPS();
            },
            (error) => {
              alert(
                'requestPermission Error requesting location permissions ' +
                  error
              );
            }
          );
      }
    });
  }

  // si on a l'autorisation d'accés à la localisation : ouvre la boite de dialogue
  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          console.log('permission ok');
        },
        (error) =>
          alert(
            'Error requesting location permissions ' + JSON.stringify(error)
          )
      );
  }
}
