import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {

  showSecret: Boolean = false
  logs: number[] = [];
  logsCounter: number=0;

  constructor() { }

  ngOnInit(): void {
  }

  addLog(){
    this.showSecret = !this.showSecret;
    this.logsCounter++;
    this.logs.push(this.logsCounter)
  }

}
