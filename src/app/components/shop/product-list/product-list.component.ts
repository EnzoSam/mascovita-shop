import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductFiltersComponent } from "../product-filters/product-filters.component";
import { Router, RouterLink } from '@angular/router';
import { CartComponent } from "../cart/cart.component";
import { Product } from '../../../model/interfaces/product.interface';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [NgFor, RouterLink,CommonModule, CurrencyPipe],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

constructor(private _cartService:CartService,
  private _router:Router
)
{}

onFilterChange($event: Event) {
throw new Error('Method not implemented.');
}
  @Input() products: Product[] = [];
filteredProducts: any;


addProductToCart(product:Product) {
  if(product)
    this._cartService.addProductToCart(product);    
}

buyNow(product:Product) {
  if(product)
    this._cartService.addProductToCart(product);    

  this._router.navigate(['../cart-resume']);
}

getDetailToOrden(_product:Product):string
{
  return this._cartService.buildProductoDetailToWhatsapp(_product);
}
}

