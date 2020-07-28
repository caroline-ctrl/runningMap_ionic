import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.page.html',
  styleUrls: ['./user-password.page.scss'],
})
export class UserPasswordPage implements OnInit {
  password: FormGroup;
  token;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router

  ) { }

  ngOnInit() {
    this.storage.get('token').then((val) => {
      this.token = val;
    });

    this.password = this.formBuilder.group({
      newPasswd: [ '', Validators.required ],
      confirmNewPasswd: [ '', Validators.required ]
    });
  }

  editPassword(){
    const formValue = this.password.value;
    const data = {
      password: formValue.newPasswd,
      token: this.token
    };

    this.userService.changePassword(data).then(user => {
      console.log(user);
      // this.storage.set('pseudo', user.pseudo);
      this.storage.remove('token');
      this.router.navigate(['home']);
    });
  }

}
