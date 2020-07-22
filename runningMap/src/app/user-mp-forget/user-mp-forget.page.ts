import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-mp-forget',
  templateUrl: './user-mp-forget.page.html',
  styleUrls: ['./user-mp-forget.page.scss'],
})
export class UserMpForgetPage implements OnInit {
  user: FormGroup;
  messageCode = null;
  mail = null;
  currentUser = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      mail: [ '', [ Validators.required, Validators.email ] ]
    });
  }

  sendMail() {
    this.mail = this.user.value.mail;

    this.userService.mail(this.mail).subscribe(() => {
    this.presentAlertPrompt(); // messageCode contient le code envoyé par le user
    });
  }

  verifyCode(code) {
    this.userService.verifyCode(this.mail).subscribe((user) => {
      this.currentUser = user;
      console.log(code);
      console.log(this.currentUser.token)
      if (code === this.currentUser.token){
        this.storage.set('token', code);
        this.router.navigate(['home']);

      } else {
        this.presentAlert('Erreur', 'Le code n\est pas bon');
      }
    }, err => {
      console.log(err);
    });
  }


  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Un mail vient de vous être envoyé',
      inputs: [
        {
          name: 'Code',
          type: 'text',
          placeholder: 'code envoyé par mail'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.verifyCode(data.Code);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
