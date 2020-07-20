import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: [ './user.page.scss' ]
})
export class UserPage implements OnInit {
  currentUser = null;
  pseudo = null;
  mp: FormGroup;
  confirmMp;
  password;
  hashMp = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.mp = this.formBuilder.group({
      oldpPasswd: [ '', Validators.required ],
      newPasswd: [ '', Validators.required ],
      confirmNewPasswd: ['', Validators.required]
    });
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
          if (confirm("Voulez vous supprimer votre compte ?")){
            // this.cookieService.deleteAll('http://localhost:3000', '', false, 'Lax');
            this.router.navigate(['index/accueil']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
}
