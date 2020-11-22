import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit {

  totalPrice = 0.00;
  totalQuantity = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  // tslint:disable-next-line: typedef
  updateCartStatus() {

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    } );
    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })

  }

}
