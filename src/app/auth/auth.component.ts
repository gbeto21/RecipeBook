import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy, OnInit{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(
        private authService: AuthService, 
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.store.select('auth').subscribe(authState=>{
            this.isLoading = authState.loading;
            this.error = authState.authError;
        })
    }    

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    onSubmit(form: NgForm){
        
        if(!form.valid){
            return
        }

        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;

        this.isLoading=true;

        if(this.isLoginMode){
            // authObs = this.authService.login(email,password);
            this.store.dispatch(new AuthActions.LoginStart(
                {email: email, password: password}
            ))
        }
        else{
            authObs = this.authService.signup(email, password);
        }

        // authObs.subscribe(resData=>{
        //     this.isLoading = false;
        //     console.log(resData);
        //     this.router.navigate(['/recipes'])
        // },
        // errorMessage=>{
        //     this.isLoading = false;
        //     this.error = errorMessage;
        //     this.showErrorAlert(errorMessage);
        //     console.log(errorMessage);
        // });

        form.reset();        
    }

    onHandleError(){
        this.error = null;
    }

    private showErrorAlert(message: string){
        const alectCmpFactory = this.componentFactoryResolver
                                    .resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alectCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }

}