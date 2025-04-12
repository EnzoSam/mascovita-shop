import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';
import { Firestore, collection, collectionData, doc, docData, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Observable<Product[]> {
    return of([]);
  }

  getCategories():string[]
  {
    return ["PERROS", "GATOS"];
  }

  private firestore: Firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'products'); // 'productos' es el nombre de tu colección en Firestore

  getAllProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductById(id: string): Observable<Product | undefined> {
    const productDocument = doc(this.firestore, `products/${id}`);
    return docData(productDocument, { idField: 'id' }) as Observable<Product | undefined>;
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const q = query(this.productsCollection, where('category', '==', category));
    return collectionData(q, { idField: 'id' }) as Observable<Product[]> as Observable<Product[]>;
  }  
}
