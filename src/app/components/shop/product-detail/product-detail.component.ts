import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../model/interfaces/product.interface';
import { CartComponent } from "../cart/cart.component";
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [NgIf, CartComponent],
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>();
  products: Product[] = [];

  constructor(private route: ActivatedRoute,
    private _cartService:CartService,
    private _productService:ProductService
  ) { 
    _productService.getProducts().subscribe(_products=>
    {
      this.products=_products;
    }
    );

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