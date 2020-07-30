import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';



@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.page.html',
  styleUrls: ['./user-connexion.page.scss'],
})
export class UserConnexionPage implements OnInit {
  userConnected;
  connectedPseudo;
  connectedIsActive;
  user: FormGroup;
  locationCoords: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    private storage: Storage,
    private geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      mail: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Félicitation !',
      message: 'Vous êtes bien connecté',
      buttons: ['OK']
    });
    await alert.present();
  }

  loginUser() {
    const formValue = this.user.value;
    const data = {
      mail: formValue.mail,
      password: formValue.password
    };

    this.userService.login(data).subscribe(
      (user) => {
        this.userConnected = user;
        // récupère le pseudo de l'objet user
        this.connectedPseudo = this.userConnected.pseudo;

        // dataStorage
        this.storage.set('pseudo', this.connectedPseudo);

        this.presentAlert();

        this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);
      }
    );
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
            console.log('ok');
          },
          (error) =>
            alert(
              'Error requesting location permissions ' + JSON.stringify(error)
            )
        );
    }
  
}
