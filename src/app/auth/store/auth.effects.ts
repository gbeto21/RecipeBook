import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import * as AuthActions from './auth.actions'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects{

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START)
    );

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart)=>{
            return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseAPIKey
                ,{
                    email:authData.payLoad.email,
                    password:authData.payLoad.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                map(
                    resData=>{
                        const expirationDate = new Date(new Date().getTime() + + resData.expiresIn *1000);
                        return new AuthActions.AuthenticateSuccess(
                            {
                                email: resData.email, 
                                userId: resData.localId, 
                                token: resData.idToken, 
                                expirationDate: expirationDate
                            }
                        );
                    }),
                    catchError(errorRes=>{

                        let errorMessage = 'An unkow error occurred!';
                    
                        if(!errorRes.error || !errorRes.error.error){
                        return of(new AuthActions.AuthenticateFail(errorMessage));
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
        
                        return of(new AuthActions.AuthenticateFail(errorMessage));
                    })
                )            
            }),
    );

    @Effect({dispatch: false})
    autSuccess = this.actions$.pipe(
        ofType( AuthActions.AUTHENTICATE_SUCCESS), 
        tap(()=>{
            this.router.navigate(['/'])
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router:Router){}

}