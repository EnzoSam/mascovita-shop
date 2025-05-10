import { Component, HostListener, OnInit } from '@angular/core';
import { ProductListComponent } from "../../components/shop/product-list/product-list.component";
import { ProductFiltersComponent } from "../../components/shop/product-filters/product-filters.component";
import { CartComponent } from "../../components/shop/cart/cart.component";
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/interfaces/product.interface';
import { IFilterProducts } from '../../model/interfaces/filter.interface';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { CurrencyPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-shop',
  imports: [ProductListComponent, ProductFiltersComponent,
     CartComponent,NgIf],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filter = new BehaviorSubject<IFilterProducts>({ pageFrom: 0, itemsCount: 10 });
  loading = false;
  hasMore = true;
  private lastDocument: any = null;
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.filter.pipe(
      tap(() => this.loading = true),
      switchMap(filter => this.productService.getProductsByFilterWithPagination(filter, this.lastDocument)),
      tap(response => {
        this.loading = false;
        if (response.products.length < this.filter.value.itemsCount) {
          this.hasMore = false;
        }
        if (response.products.length > 0) {
          this.lastDocument = response.lastDocument;
          this.products = [...this.products, ...response.products];
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.loading || !this.hasMore) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollThreshold = documentHeight - 200;

    if (scrollPosition > scrollThreshold) {
      this.loadMore();
    }
  }

  loadMore(): void {
    this.filter.next({
      ...this.filter.value,
      pageFrom: this.filter.value.pageFrom + 1
    });
  }

  onCategoryChange(categories: string[]) {
    this.resetSearch();
    this.filter.next({
      ...this.filter.value,
      categories: categories,
      pageFrom: 0
    });
  }

  resetSearch()
  {
    this.lastDocument = null;
    this.products = [];
    this.hasMore =  true;
  }


  onBrandChange(brands: string[]) {

    this.resetSearch();
    this.filter.next({
      ...this.filter.value,
      brands: brands,
      pageFrom: 0
    });
  }  
}
