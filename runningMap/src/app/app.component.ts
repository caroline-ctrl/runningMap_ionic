import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  pseudo = null;
  currentUser;


  editMenu$ = new Observable<boolean>(observer => {
    this.storage.get('pseudo').then((val) => {
      this.pseudo = val;

      if (this.pseudo) {
        observer.next(false);
      } else {
        observer.next(true);
      }
    });
  });

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private storage: Storage
  ) {
    this.sideMenu();
    this.initializeApp();
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
}
