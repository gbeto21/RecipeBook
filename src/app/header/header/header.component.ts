import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage-service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
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

}
