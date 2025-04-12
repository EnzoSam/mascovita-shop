import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "../../components/shop/product-list/product-list.component";
import { ProductFiltersComponent } from "../../components/shop/product-filters/product-filters.component";
import { CartComponent } from "../../components/shop/cart/cart.component";
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/interfaces/product.interface';


@Component({
  selector: 'app-shop',
  imports: [ProductListComponent, ProductFiltersComponent, CartComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  filteredProducts: Product[] = [];
  selectedCategories: string[] = [];
  selectedPriceRange: string = '';

  constructor(private _productService:ProductService)
  {    
    _productService.getAllProducts().pipe
    ().subscribe(p=>
    {
      this.products = p;
      this.filteredProducts = [...this.products];
    }
    );
  }

  ngOnInit() {
    
  }

  onCategoryChange(categories: string[]) {
    this.selectedCategories = categories;
    this.filterProducts();
  }

  onPriceRangeChange(priceRange: string) {
    this.selectedPriceRange = priceRange;
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      let categoryMatch = true;
      let priceMatch = true;

      if (this.selectedCategories.length > 0) {
        categoryMatch = this.selectedCategories.includes(product.category);
      }

      if (this.selectedPriceRange) {
        const [min, max] = this.selectedPriceRange.split('-').map(Number);
        if (max) {
          priceMatch = product.price >= min && product.price <= max;
        } else {
          priceMatch = product.price >= min;
        }
      }

      return categoryMatch && priceMatch;
    });
  }
}
