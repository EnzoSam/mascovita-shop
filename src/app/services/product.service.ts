import { inject, Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';
import { Firestore, collection, collectionData, doc, docData, getDocs, limit, orderBy, query, startAfter, where } from '@angular/fire/firestore';
import { IFilterProducts } from '../model/interfaces/filter.interface';

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
  getProductsByFilterWithPagination(filter: IFilterProducts, lastDocument: any): Observable<{ products: Product[], lastDocument: any }> {
    const queryConstraints = [];

    console.log(filter);

    if (filter.categories && filter.categories.length > 0) {
      queryConstraints.push(where('category', 'array-contains-any', filter.categories));
    }

    if (filter.brands && filter.brands.length > 0) {
      queryConstraints.push(where('name', 'array-contains-any', filter.brands));
    }

    if (filter.age && filter.age.length > 0) {
      queryConstraints.push(where('name', 'array-contains-any', filter.age));
    }

    if (filter.filterText) {
      queryConstraints.push(where('name', '>=', filter.filterText));
      queryConstraints.push(where('name', '<=', filter.filterText + '\uf8ff'));
    }

    const first = limit(filter.itemsCount);
    let q;

    if (lastDocument) {
      q = query(this.productsCollection, ...queryConstraints, orderBy('__name__'), startAfter(lastDocument), first);
    } else {
      q = query(this.productsCollection, ...queryConstraints, orderBy('__name__'), first);
    }

    return from(getDocs(q)).pipe(
      map(snapshot => {
        const products: Product[] = [];
        let newLastDocument: any = null;

        snapshot.forEach(doc => {
          products.push({ id: +doc.id, ...doc.data() } as Product);
          newLastDocument = doc;
        });

        return { products, lastDocument: newLastDocument };
      })
    );
  }
}
