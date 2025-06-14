import { inject, Injectable } from '@angular/core';
import { from, map, Observable, of } from 'rxjs';
import { Product } from '../model/interfaces/product.interface';
import { Firestore, collection, collectionData, doc, docData, getDocs, limit, orderBy, query, startAfter, where } from '@angular/fire/firestore';
import { IFilterProducts } from '../model/interfaces/filter.interface';
import { environment } from '../../environments/envirorments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categories:string[];
  brands:string[];
  defaultDiscount:number;

  constructor()
  {
    this.categories = environment.ecomerce.categories ||
    ["PERROS", "GATOS","GALLINAS","AGRO","ACCESORIOS"];
    this.brands = environment.ecomerce.brands ||
    ['SABROSITOS', 'UPPER', 'WHISKAS', 'PEDIGREE',
      'DOG SELECTION','NUTRIBON', 'DOCTOR PERROT', 'CRIANZA', 'DOG CHOW',
    'CAT CHOW','DOGUI','GANACAN','GRAN CAMPEON','PROTEMIX', 'VAGONETA', 'METRIVE'];
    this.defaultDiscount = environment.ecomerce.discount;
  }

  getProducts(): Observable<Product[]> {
    return of([]);
  }

  getCategories():string[]
  {
    return this.categories;
  }

  getBrands():string[]
  {
    return this.brands;
  }

  getAges():string[]
  {
    return ["ADULTO", "CACHORRO"];
  }

  private firestore: Firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'products');

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
  getProductsByFilterWithPagination
  (filter: IFilterProducts, lastDocument: any): 
    Observable<{ products: Product[], lastDocument: any }> {
    const queryConstraints = [];

    if (filter.categories && filter.categories.length > 0) {
      queryConstraints.push(where('category', 'in', filter.categories));
    }

    if (filter.brands && filter.brands.length > 0) {
      queryConstraints.push(where('brand', 'in', filter.brands));
    }    

    if (filter.filterText && filter.filterText !== '') {
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
          let p = { id: +doc.id, ...doc.data() } as Product;
          this.applyDiscount(p)
          products.push(p);
          newLastDocument = doc;
        });

        return { products, lastDocument: newLastDocument };
      })
    );
  }

  applyDiscount(_product:Product)
  {
    _product.discountedPrice = 
    _product.price - ((_product.price * this.defaultDiscount) / 100);
  }
}
