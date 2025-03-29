import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductFiltersComponent } from "../product-filters/product-filters.component";
import { RouterLink } from '@angular/router';
import { CartComponent } from "../cart/cart.component";

interface Product {
  id:number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [NgFor, RouterLink],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
onFilterChange($event: Event) {
throw new Error('Method not implemented.');
}
  @Input() products: Product[] = [];
filteredProducts: any;
}