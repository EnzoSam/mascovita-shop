import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from "../../components/shop/product-list/product-list.component";
import { ProductFiltersComponent } from "../../components/shop/product-filters/product-filters.component";
import { CartComponent } from "../../components/shop/cart/cart.component";
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/interfaces/product.interface';
import { IFilterProducts } from '../../model/interfaces/filter.interface';


@Component({
  selector: 'app-shop',
  imports: [ProductListComponent, ProductFiltersComponent, CartComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  filter:IFilterProducts;
  filteredProducts: Product[] = [];
  constructor(private _productService:ProductService)
  {    
    this.filter = {
      categories:undefined,
      brands:undefined,
      age:undefined,
      filterText:undefined,
      pageFrom:0,
      itemsCount:20
    }
  }

  ngOnInit() {
    this.filterProducts(); 
  }

  onCategoryChange(categories: string[]) {
    this.filter.categories = categories;
    this.filterProducts();
  }

  filterProducts() {

    this._productService.getProductsByFilter(this.filter).subscribe
    (products=>
    {
      this.filteredProducts = products;
    },
    error=>{
        console.log('Error al cargar productos');
      });
  }
}
