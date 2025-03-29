import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../../../model/interfaces/cart.interface';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports:[RouterLink],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartSubscription:Subscription;
  cart:Cart;
  total:number = 0;
  constructor(private _cartService:CartService)
  {
    this.cart = _cartService.newCart();
    this.cartSubscription = _cartService.cart
    ().subscribe(_cart=>this.cartChanged(_cart));
  }
  ngOnDestroy(): void {
    
    if(this.cartSubscription)
      this.cartSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  cartChanged(_cart:Cart)
  {
    this.total = this._cartService.getTotal(_cart);
  }

  removeItem(product:Product)
  {

  }

}