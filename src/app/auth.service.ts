import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.apiUrl;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'auth_user';
  AUTHORITY_SESSION_ATTRIBUTE_NAME = 'edit_role';
  username: string = "";
  password: string = "";


  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string) {

    return this.http.get(`${this.API_URL}/api/auth`, {
      headers: { authorization: this.createBasicAuthToken(username, password) }
    }).pipe(map((response) => {
      this.username = username;
      this.password = password;
      var authorities = response['principal'];
      this.registerInSession(username, password, authorities);
    }));
  }

  createBasicAuthToken(username: string, password: string) {

    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerInSession(username, password, authorities) {

    let basicAuthToken = this.createBasicAuthToken(username, password);

    sessionStorage.setItem(
      this.AUTHORITY_SESSION_ATTRIBUTE_NAME,
      authorities.hasEditAccess
    );
    sessionStorage.setItem(
      this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      basicAuthToken
    );
  }

  logout() {

    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.AUTHORITY_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;

  }

  hasEditAuthority() {
    var authorities = sessionStorage.getItem(this.AUTHORITY_SESSION_ATTRIBUTE_NAME);

    if (authorities == "true") {
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedin() {

    let loggedInUser = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (loggedInUser === null) return false
    return true
  }

  getLoggedinUser() {

    let loggedInUser = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (loggedInUser === null) return ''
    return loggedInUser
  }
}
