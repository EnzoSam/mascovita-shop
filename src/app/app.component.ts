import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from "./components/shop/cart/cart.component";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'mascovita-shop';
  cartItems: Product[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  addProductToCart(product: Product) {
    this.cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
