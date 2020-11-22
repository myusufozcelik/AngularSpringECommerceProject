import { CartItem } from './../common/cart-item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  // tslint:disable-next-line: typedef
  addToCart(theCartItem: CartItem) {

    // check if we already have th eitem in our cart

    let alreadyExistInCart = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0 ) {

      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(data => data.id === theCartItem.id);

      // check if we found it
      alreadyExistInCart = (existingCartItem !== undefined); // boolean value returns
    }
    if (alreadyExistInCart) {
      // increment the quantity.
      existingCartItem.quantity++;
    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }
    // compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const currentCartItem of this.cartItems) {
        totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
        totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values ... all subscribes will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debuggin purposes
    this.logCartData(totalPriceValue, totalQuantityValue);


  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name : ${tempCartItem.name}, quantity = ${tempCartItem.quantity}, unitPrice = ${tempCartItem.unitPrice}, subTotalPrice = ${subTotalPrice} `);
    }
 // toFixed => 123,21
    console.log(`totalPrice : ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue} `);
    console.log('Log Card : ')
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }
  // tslint:disable-next-line: typedef
  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(data => data.id === theCartItem.id);
    // /if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1); // itemIndex start deleteCount 1
      this.computeCartTotals();
    }
  }

}
