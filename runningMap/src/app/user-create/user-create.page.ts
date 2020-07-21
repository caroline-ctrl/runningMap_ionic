import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.page.html',
  styleUrls: ['./user-create.page.scss'],
})
export class UserCreatePage implements OnInit {
  user: FormGroup;
  confirmMp = null;
  mp = null;
  connectedPseudo;
  connectedIsActive;
  userConnected;
  subscribe;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.user = this.formBuilder.group({
      avatar: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pseudo: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Félicitation !',
      message: 'Vous êtes bien inscrit',
      buttons: ['OK']
    });
    await alert.present();
  }


  createUser() {
    const avatar = "avatar.png";
    
    const formValue = this.user.value;
    const data = new User (
      avatar,
      formValue.firstname,
      formValue.lastname,
      formValue.pseudo,
      formValue.mail,
      formValue.city,
      formValue.gender,
      formValue.age,
      formValue.password,
    );

    this.confirmMp = this.user.value.confirmPassword;
    this.mp = this.user.value.password;

    this.userService.createUser(data).subscribe(
      (result) => {
        console.log(result);
        this.storage.set('pseudo', this.connectedPseudo);
        this.presentAlert();
        this.router.navigate(['home']);
        this.actualyNabBar();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  age_user(n: number): any []{
    return Array(n);
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
}
