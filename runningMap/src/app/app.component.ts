import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  pseudo = null;
  currentUser;
  editMenu$;


  ionViewWillEnter() {
    this.editMenu$ = new Observable<boolean>(observer => {
      this.storage.get('pseudo').then((val) => {
  console.log(val)
        if (val) {
          observer.next(false);
        } else {
          observer.next(true);
        }
      });
    });
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public alertController: AlertController,
    private router: Router
  ) {
    this.sideMenu();
    this.initializeApp();
    this.ionViewWillEnter();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  sideMenu(){
    this.navigate = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home-outline'
      },
      {
        title: 'Itineraire = Aller-retour',
        url: '/roundTrip',
        icon: 'trail-sign-outline'
      },
      {
        title: 'Itineraire = Boucle',
        url: '/loop',
        icon: 'infinite-outline'
      },
      {
        title: 'Mon compte',
        url: '/monCompte',
        icon: 'construct-outline'
      }
    ];
  }

    // deconnexion
    removeDataStorage() {
      this.storage.remove('pseudo');
      this.presentAlert();
      // this.actualyNabBar();
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
