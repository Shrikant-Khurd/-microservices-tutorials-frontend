import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PMS';
  msg: string = "Hello from Angular....";

  name:string="shrikant khurd"
  number: number = 200;
  todayDate: Date = new Date();

  str: string = "Helloooooo";
  num: string = "number";
  //fruits:string[]=["Apple", "Grapes", "Banana","Mango"];
  fruits: string[] = [];

  flag: boolean = true;

  url = "./assets/images/duke.jpg"

  getMsg(): string {
    return this.msg;
  }
  sayHello() {
    alert("Hello");
  }
}
