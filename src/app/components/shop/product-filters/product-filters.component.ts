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
  @Output() brandChanged = new EventEmitter<string[]>();
  @Output() ageChanged = new EventEmitter<string[]>();

  categories:string[] = [];
  brands:string[] = [];
  ages:string[] = [];
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedAges: string[] = [];

  constructor(private _productService:ProductService)
  {

  }

  ngOnInit(): void {
    
    this.categories = this._productService.getCategories();
    this.brands = this._productService.getBrands();
    this.ages = this._productService.getAges();
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

  brandChange(brand: string, event: any) {
    if (event.target.checked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    this.brandChanged.emit(this.selectedBrands);
  }  

  ageChange(brand: string, event: any) {
    if (event.target.checked) {
      this.selectedAges.push(brand);
    } else {
      const index = this.selectedAges.indexOf(brand);
      if (index !== -1) {
        this.selectedAges.splice(index, 1);
      }
    }
    this.ageChanged.emit(this.selectedAges);
  }    
}