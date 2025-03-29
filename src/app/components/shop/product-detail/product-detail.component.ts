import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../model/interfaces/product.interface';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [NgIf, CartComponent],
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>();
  products: Product[] = [
    {id:1, name: 'Producto 1', description: 'Descripción 1', price: 50, category: 'electronica', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id:2,name: 'Producto 2', description: 'Descripción 2', price: 100, category: 'ropa', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 3,name: 'Producto 3', description: 'Descripción 3', price: 150, category: 'libros', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    // Agrega más productos
  ];

  constructor(private route: ActivatedRoute,
    private _cartService:CartService
  ) { 
    

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(product => product.id === id);
  }

  addProductToCart() {
    if(this.product)
      this._cartService.addProductToCart(this.product);    
  }  
}