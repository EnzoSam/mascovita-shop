import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Producto 1', description:'', price: 1000, category: 'Perro', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 2, name: 'Producto 2',  description:'',price: 500, category: 'Gato', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 3, name: 'Producto 3', description:'', price: 1500, category: 'Conejo', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 4, name: 'Producto 4',  description:'', price: 200, category: 'Aves', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getCategories():string[]
  {
    return this.products.map(p=>p.category);
  }
}
