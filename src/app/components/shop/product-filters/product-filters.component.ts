import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  imports:[NgFor],
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent implements OnInit{

  @Output() categoryChanged = new EventEmitter<string[]>();
  @Output() priceRangeChanged = new EventEmitter<string>();

  categories:string[] = [];
  priceRanges = ['0-50', '51-100', '100+'];
  selectedCategories: string[] = [];
  selectedPriceRange: string = '';

  constructor(private _productService:ProductService)
  {

  }

  ngOnInit(): void {
    
    this.categories = this._productService.getCategories();
  }

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