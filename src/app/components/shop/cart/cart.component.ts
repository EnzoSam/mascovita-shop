import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
  imports:[NgFor],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  @Output() cartItemsChange = new EventEmitter<Product[]>();

  ngOnInit() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.updateLocalStorage();
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsChange.emit([...this.cartItems]);
  }
}