import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {
  currentUser = null;
  imageSrc: string;
  fileToUpload: File = null;
  user: FormGroup;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserById(this.route.snapshot.paramMap.get('id'));

    this.user = this.formBuilder.group({
      avatar: [''],
      firstname: [''],
      lastname: [''],
      pseudo: [''],
      mail: ['',  Validators.email],
      city: [''],
      gender: [''],
      age: [null],
    });

  }

  // alerte
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modification',
      message: 'Votre compte a bien été modifié',
      buttons: ['OK']
    });
    await alert.present();
  }

  // recupère l'objet user a partir de l'id
  getUserById(id: string) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // modifie le user et renvoie un message
  updateUser() {
    const formValue = this.user.value;
    const data = new User (
      formValue.avatar,
      formValue.firstname,
      formValue.lastname,
      formValue.pseudo,
      formValue.mail,
      formValue.city,
      formValue.gender,
      formValue.age,
      formValue.password,
    );

    const id = this.currentUser._id;

    this.userService.updateUser(id, data).subscribe(
      (result) => {
        this.presentAlert();
        // this.router.navigate(['monCompte']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  updateAvatar(){
    const formValue = this.user.value;
    const data = new User (
      formValue.avatar,
      formValue.firstname,
      formValue.lastname,
      formValue.pseudo,
      formValue.mail,
      formValue.city,
      formValue.gender,
      formValue.age,
      formValue.password,
    );

    const id = this.currentUser._id;

    this.userService.updateUser(id, data).subscribe(
      (result) => {
        console.log('user modifié');
        // this.router.navigate(["index/accueil"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  age_user(n: number): any []{
    return Array(n);
  }
}
