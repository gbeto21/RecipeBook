import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
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
                .pipe(catchError(this.handleError))
    }

    login(email: string, password: string){
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPP2y6cxvqYczcyubSQF7V21Tz826T2yM'
                ,{
                    email:email,
                    password:password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError))
    }

    private handleError(errorRes: HttpErrorResponse){

        let errorMessage = 'An unkow error occurred!';
                    if(!errorRes.error || !errorRes.error.error){
                        return throwError(errorMessage);
                    }
                    switch (errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMessage = 'This mail exist already';
                            break;
                    
                        case 'EMAIL_NOT_FOUND':
                            errorMessage = 'This email does not exist.';
                            break;

                        case 'INVALID_PASSWORD':
                            errorMessage = 'This password is not correct.';
                            break;    
                        default:
                            break;
                    }
        
        return throwError(errorMessage);

    }

}
