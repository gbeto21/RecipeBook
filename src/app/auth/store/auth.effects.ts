import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import * as AuthActions from './auth.actions'

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class AuthEffects{
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
            ).pipe(catchError(error=>{
                of();
            }),map(
                resData=>{
                    of();
                }
            ));
        }),
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient){}

}