import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit,OnChanges {

  @Input() counter1:number=0

  @Output() increment:EventEmitter<number>= new EventEmitter();

  constructor() { }

ngOnChanges(changes: SimpleChanges):void{
  console.log("ngOnChanges child component...");
  
}

  ngOnInit(): void {
    console.log("ngOnInit child component...");
    
    console.log(this.counter1);
    
  }
incrementCounter(){
  this.increment.emit(++this.counter1);
}
}
