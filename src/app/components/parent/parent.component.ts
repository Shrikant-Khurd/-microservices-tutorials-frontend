import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  counter:number=15;
  constructor() { }

  ngOnInit(): void {
  }

  parentCounter(value:number){
    this.counter=value;
  }
}
