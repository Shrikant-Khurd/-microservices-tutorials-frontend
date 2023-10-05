import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {
  totalQuantities: number = 0;
  constructor(public _service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._service.totalQuantities$.subscribe(totalQuantities => {
      this.totalQuantities = totalQuantities;
    });
  }

  logout() {
    this._service.logout();
    this.router.navigate(['/products']);
  }

}
