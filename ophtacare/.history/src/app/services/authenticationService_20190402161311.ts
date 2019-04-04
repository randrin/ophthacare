import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Admin } from '../models/administrateur/admin';

@Injectable()
export class AuthenticationService {

    public admin = new Admin(0, true, '', '', '', '', '', '');
    private loginUrl = window['baseUrl'] + '/admin/login';

    constructor(
        public router: Router, private http: Http) {
    }

    login(admin) {
        return this.getAdmin(admin);
    }

    public getAdmin(admin) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('username', admin.username);
        params.set('password', admin.password);
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, params, options);
    }

    public setAdmin(value) {
        this.admin = value;
    }

    public getUsername() {
        if (this.admin == null) {
          return '';
        }
       return this.admin.username;
    }
}