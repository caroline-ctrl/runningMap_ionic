import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController
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

        // cookie
        // this.cookieService.set('pseudo', this.connectedPseudo, 7, 'http://localhost:3000', '', false, 'Lax');

        this.presentAlert();

        this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
