import { Component, OnDestroy } from '@angular/core';
import { Cart } from '../../../model/interfaces/cart.interface';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../model/interfaces/cartItem.interface';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../../environments/envirorments';

@Component({
  selector: 'app-cart-resume',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.css'
})
export class CartResumeComponent implements OnDestroy{

  cart:Cart;
  cartSubscription:Subscription
  defaultShippingCost:number = 0;

  constructor(private _cartService:CartService)
  {
    this.defaultShippingCost = environment.ecomerce.shippingCost;
    this.cart = _cartService.currentCart();
    this.cartSubscription = _cartService.cart().subscribe
    (_cart=>
    {
      this.cart = _cart;
    }
    )
    
  }
  ngOnDestroy(): void {
    if(this.cartSubscription)
      this.cartSubscription.unsubscribe();
  }

  updateQuantity(item:CartItem, quantity:number)
  {
    this._cartService.changeQuantity(item.product.id, quantity);
  }

  removeItem(item:CartItem)
  {
    this._cartService.removeItem(item.product.id);
  }

  checkout()
  {

  }

  getDetail():string
  {
    return this._cartService.buildCartDetailToWhatsapp(this.cart);
  }

  getTotal():number
  {
    return this._cartService.getTotal(this.cart);
  }

  hasItems():boolean
  {
    return this.cart && this.cart.products && this.cart.products.length> 0;
  }
}
