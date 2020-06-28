import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;

  constructor(
    private dataStoraeService: DataStorageService
  ) { }

  ngOnInit(): void {
  }
  
  onSaveData(){
    this.dataStoraeService.storeRecipes();
  }

}
