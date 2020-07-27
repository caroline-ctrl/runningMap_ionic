import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<User[]>(this.URL_API + '/users');
  }

  getUserById(id: string) {
    return this.http.get<User>(this.URL_API + '/user/' + id);
  }

  createUser(data) {
    return this.http.post<User>(this.URL_API + '/create/' , data);
  }

  updateUser(id, data) {
    return this.http.put<User>(this.URL_API + '/update/' + id, data);
  }

  uploadAvatar(id, data) {
    return this.http.put<User>(this.URL_API + '/update/' + id, data);
  }

  updatePassword(data) {
    return this.http.put<User>(this.URL_API + '/newPassword/', data);
  }

  delete(id) {
    return this.http.delete<User>(this.URL_API + '/delete/' + id);
  }

  login(data) {
    return this.http.post<User>(this.URL_API + '/log/', data);
  }
  
  getUserByPseudo(data) {
    return this.http.post<User>(this.URL_API + '/monCompte/', {"pseudo": data});
  }

  mail(data) {
    return this.http.post<User>(this.URL_API + '/mail/', {"mail": data});
  }

  verifyCode(data) {
    return this.http.post<User>(this.URL_API + '/verifyCode/', {"mail": data});
  }

  changePassword(data) {
    return this.http.put<User>(this.URL_API + '/forgetPassword/', data);
  }
}
