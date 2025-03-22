import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "../../components/shop/product-list/product-list.component";
import { ProductFiltersComponent } from "../../components/shop/product-filters/product-filters.component";

interface Product {
  id:number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-shop',
  imports: [ProductListComponent, ProductFiltersComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [
    {id:1, name: 'Producto 1', description: 'Descripción 1', price: 50, category: 'electronica', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id:2,name: 'Producto 2', description: 'Descripción 2', price: 100, category: 'ropa', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 3,name: 'Producto 3', description: 'Descripción 3', price: 150, category: 'libros', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    // Agrega más productos
  ];

  filteredProducts: Product[] = [];
  selectedCategories: string[] = [];
  selectedPriceRange: string = '';

  ngOnInit() {
    this.filteredProducts = [...this.products];
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
