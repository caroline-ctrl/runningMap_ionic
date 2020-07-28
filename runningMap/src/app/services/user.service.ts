import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API = 'https://apirunningmap.herokuapp.com';

  constructor(private http: HTTP) { }

  getAllUser() {
    return this.http.get(this.URL_API + '/users', {}, {}).then(res => console.log(res)).catch(err => console.log(err));
  }

  getUserById(id: string) {
    return this.http.get(this.URL_API + '/user/' + id, {}, {}).then(res => console.log(res)).catch(err => console.log(err));
  }

  createUser(data) {
    return this.http.post(this.URL_API + '/create/' , data, {});
  }

  updateUser(id, data) {
    return this.http.put(this.URL_API + '/update/' + id, data, {});
  }

  uploadAvatar(id, data) {
    return this.http.put(this.URL_API + '/update/' + id, data, {});
  }

  updatePassword(data) {
    return this.http.put(this.URL_API + '/newPassword/', data, {});
  }

  delete(id) {
    return this.http.delete(this.URL_API + '/delete/' + id, {}, {});
  }

  login(data) {
    return this.http.post(this.URL_API + '/log/', data, {});
  }
  
  getUserByPseudo(data) {
    return this.http.post(this.URL_API + '/monCompte/', {"pseudo": data}, {});
  }

  mail(data) {
    return this.http.post(this.URL_API + '/mail/', {"mail": data}, {});
  }

  verifyCode(data) {
    return this.http.post(this.URL_API + '/verifyCode/', {"mail": data},{});
  }

  changePassword(data) {
    return this.http.put(this.URL_API + '/forgetPassword/', data, {});
  }
}
