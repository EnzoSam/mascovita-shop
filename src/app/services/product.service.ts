import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';
import { Firestore, collection, collectionData, doc, docData, limit, query, where } from '@angular/fire/firestore';
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

  getProductsByFilter(filter: IFilterProducts): Observable<Product[]> {
    const queryConstraints = [];

    if (filter.categories && filter.categories.length > 0) {
      queryConstraints.push(where('category', 'in', filter.categories));
    }

    if (filter.brands && filter.brands.length > 0) {
      queryConstraints.push(where('brand', 'in', filter.brands));
    }

    if (filter.age && filter.age.length > 0) {
      queryConstraints.push(where('age', 'array-contains-any', filter.age)); // Asumiendo que 'age' es un array en tus documentos
    }

    if (filter.filterText) {
      // Aquí puedes implementar una búsqueda más avanzada si es necesario.
      // Una búsqueda simple podría ser por nombre o descripción que contenga el texto.
      // Esto puede requerir indexación especial en Firebase.
      queryConstraints.push(where('name', '>=', filter.filterText));
      queryConstraints.push(where('name', '<=', filter.filterText + '\uf8ff')); // Para búsqueda por prefijo
    }

    // Paginación
    const first = limit(filter.itemsCount);
    let q;

    if (filter.pageFrom > 0) {
      // Necesitas una forma de obtener el último documento de la página anterior para usar startAfter
      // Esto requiere mantener un registro del último documento consultado.
      // Para simplificar, este ejemplo muestra cómo hacer la primera página.
      console.warn('La paginación a partir de una página específica requiere una implementación más compleja con cursores.');
      q = query(this.productsCollection, ...queryConstraints, first);
    } else {
      q = query(this.productsCollection, ...queryConstraints, first);
    }

    return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }
}
