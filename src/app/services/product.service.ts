import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Dog Selection Adulto', description:'', price: 1000, category: 'Perro', imageUrl: 'https://catycanar.vtexassets.com/arquivos/ids/170895/ORIGINAL-CRIADORES-DOG-SELECTION-ADULTOS-21kg--1-.png?v=638555360646000000' },
    { id: 2, name: 'Whiskas',  description:'',price: 500, category: 'Gato', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5X7xryOjkQ3J3x1yX-HPilz5xnZ0WTioO3A&s' },
    { id: 3, name: 'Nutribon', description:'', price: 1500, category: 'Perro', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS94RInQWN6rwMbmlSLhY1oqY0SKc9bw8Nc-A&s' },
    { id: 4, name: 'Gallina Ponedora',  description:'', price: 200, category: 'Aves', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROrpcnuSOZRRCGVsqM9bj2EDVaajWiXVn7Dg&s' },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getCategories():string[]
  {
    return this.products.map(p=>p.category);
  }
}
