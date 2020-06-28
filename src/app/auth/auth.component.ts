import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    constructor(
        private authService: AuthService, 
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
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
            authObs = this.authService.login(email,password);
        }
        else{
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(resData=>{
            this.isLoading = false;
            console.log(resData);
            this.router.navigate(['/recipes'])
        },
        errorMessage=>{
            this.isLoading = false;
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            console.log(errorMessage);
        });

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

        hostViewContainerRef.createComponent(alectCmpFactory);

    }

}