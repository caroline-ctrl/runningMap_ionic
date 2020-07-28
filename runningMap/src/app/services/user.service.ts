import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new Headers({
    'Content-Type':  'application/json'
  });

  private URL_API = 'https://apirunningmap.herokuapp.com';

  constructor(private http: HTTP) { }

  getAllUser() {
    return this.http.get(this.URL_API + '/users', {}, {
      headers: this.headers
    }).then(res => console.log(res)).catch(err => console.log(err));
  }

  getUserById(id: string) {
    return this.http.get(this.URL_API + '/user/' + id, {}, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  createUser(data) {
    return this.http.post(this.URL_API + '/create/' , data, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  updateUser(id, data) {
    return this.http.put(this.URL_API + '/update/' + id, data, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  uploadAvatar(id, data) {
    return this.http.put(this.URL_API + '/update/' + id, data, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  updatePassword(data) {
    return this.http.put(this.URL_API + '/newPassword/', data, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  delete(id) {
    return this.http.delete(this.URL_API + '/delete/' + id, {}, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  login(data) {
    return this.http.post(this.URL_API + '/log/', data, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }
  
  getUserByPseudo(data) {
    return this.http.post(this.URL_API + '/monCompte/', {"pseudo": data}, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  mail(data) {
    return this.http.post(this.URL_API + '/mail/', {"mail": data}, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  verifyCode(data) {
    return this.http.post(this.URL_API + '/verifyCode/', {"mail": data}, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }

  changePassword(data) {
    return this.http.put(this.URL_API + '/forgetPassword/', data, {
      headers: this.headers
    }).then(data => {
      console.log(data.headers);
    })
    .catch(err => {
      console.log(err)
    });
  }
}
