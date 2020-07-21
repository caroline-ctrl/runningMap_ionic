import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: [ './user.page.scss' ]
})
export class UserPage implements OnInit {
  currentUser;
  pseudo = null;
  mp: FormGroup;
  confirmMp;
  password;
  hashMp = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('pseudo').then(val => {
      this.pseudo = val;
      this.getBypseudo();
    });


    this.mp = this.formBuilder.group({
      oldpPasswd: [ '', Validators.required ],
      newPasswd: [ '', Validators.required ],
      confirmNewPasswd: [ '', Validators.required ]
    });
  }

  // recupère le pseudo du datastorage qu'il envoie a l'api et recupère l'objet user
  getBypseudo() {
    this.userService.getUserByPseudo(this.pseudo).subscribe(
      (user) => {
        this.currentUser = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  
  // modif le mp
  editMp() {
    const formValue = this.mp.value;
    const data = {
      pseudo: this.currentUser.pseudo,
      oldPasswd: formValue.oldpPasswd,
      NewPasswd: formValue.newPasswd
    };

    this.userService.updatePassword(data).subscribe(
      (result) => {
        alert('Mot de passe modifié');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // supprimer compte
  deleteUser() {
    this.userService.delete(this.currentUser._id).subscribe(
      (user) => {
        if (confirm('Voulez vous supprimer votre compte ?')) {
          // this.cookieService.deleteAll('http://localhost:3000', '', false, 'Lax');
          this.router.navigate([ 'index/accueil' ]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
