import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage-service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStoraeService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState=>authState.user))
      .subscribe(user=>{
        this.isAuthenticated = !!user;
      })
  }
  
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  onSaveData(){
    this.dataStoraeService.storeRecipes();
  }

  onFetchData(){
    this.dataStoraeService.fetchRecipes().subscribe();
  }

  onLogOut(){
    this.authService.logout();
  }

}
