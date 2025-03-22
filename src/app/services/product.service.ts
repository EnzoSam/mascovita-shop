import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Producto 1', price: 1000, category: 'Electrónica', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 2, name: 'Producto 2', price: 500, category: 'Hogar', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 3, name: 'Producto 3', price: 1500, category: 'Electrónica', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 4, name: 'Producto 4', price: 200, category: 'Moda', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
