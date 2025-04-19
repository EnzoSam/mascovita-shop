import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';
import { Cart } from '../model/interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSubject:BehaviorSubject<Cart>;

  constructor()
  {
    this.cartSubject = new BehaviorSubject<Cart>(this.getCartFromLocalStorage());
    this.currentCart()
  }

  currentCart():Cart
  {
    return this.cartSubject.value
  }

  addProductToCart(product: Product) {
    let cart = this.getCartFromLocalStorage();

    console.log(cart)
    let cartItem = cart.products.find(p=>p.product.id === product.id);

    if(!cartItem)
    {
      cartItem =
      {
        product: product,
        quantity: 0
      };
      cart.products.push(cartItem);
    }
    cartItem.quantity++;
    this.saveCart(cart);
    this.cartSubject.next(cart);
    console.log(cart)
  }  

  cart():Observable<Cart>
  {
    return this.cartSubject.asObservable();
  }

  getCartFromLocalStorage():Cart
  {
    let cart: Cart = JSON.parse(localStorage.getItem('cart')||
    JSON.stringify(this.newCart()));
    if(!cart)
      cart = this.newCart();
    return cart;
  }

  saveCart(cart:Cart)
  {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  newCart():Cart
  {
    return {
      products:[] = []
    };
  }

  removeItem(productiD: number) {
    let cart = this.getCartFromLocalStorage();
    cart.products = cart.products.filter(p=>p.product.id !== productiD);
    this.saveCart(cart);
    this.cartSubject.next(cart);
  }

  getTotal(cart:Cart) {
    let r = cart.products.reduce((total, item) =>
       total + item.product.price * item.quantity, 0);
    return r;
  }  

  changeQuantity(productiD: number, _quantity:number) {
    let cart = this.getCartFromLocalStorage();
    let item = cart.products.find(p=>p.product.id === productiD);
    if(item)
    {
      item.quantity = _quantity;
      this.saveCart(cart);
      this.cartSubject.next(cart);
    }
  }  

  buildCartDetailToWhatsapp(cart: Cart): string {
    let detail = "Hola! estoy necesitando lo siguiente: \n";
  
    for (let i of cart.products) {
      if(i.quantity > 0)
        detail += i.product.name + " cantidad: " + i.quantity + "\n";
    }
  
    detail += "\n";
    detail += "*Total: " + this.getTotal(cart) + '*';
  
    return encodeURIComponent(detail);
  }
}
