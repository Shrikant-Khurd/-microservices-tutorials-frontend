import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderCartComponent } from './place-order-cart.component';

describe('PlaceOrderCartComponent', () => {
  let component: PlaceOrderCartComponent;
  let fixture: ComponentFixture<PlaceOrderCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceOrderCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOrderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
