import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient){}

    signup(email: string, password: string){
        console.log("Email " + email);
        console.log("password " + password);
        
        return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPP2y6cxvqYczcyubSQF7V21Tz826T2yM',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
    }

}
