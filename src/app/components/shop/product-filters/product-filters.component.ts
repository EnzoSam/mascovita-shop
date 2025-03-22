import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  imports:[NgFor],
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent {
  @Output() categoryChanged = new EventEmitter<string[]>();
  @Output() priceRangeChanged = new EventEmitter<string>();

  categories = ['electronica', 'ropa', 'libros'];
  priceRanges = ['0-50', '51-100', '100+'];
  selectedCategories: string[] = [];
  selectedPriceRange: string = '';

  categoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.categoryChanged.emit(this.selectedCategories);
  }

  priceRangeChange(priceRange: string) {
    this.selectedPriceRange = priceRange;
    this.priceRangeChanged.emit(this.selectedPriceRange);
  }
}