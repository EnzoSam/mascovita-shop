import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, docData, getDocs, limit, orderBy, query, startAfter, where } from '@angular/fire/firestore';
import { Product } from '../../model/interfaces/product.interface';
import { Badge } from '../models/badge.interface';
import { PointsBalance } from '../models/pointBalance.interface';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private firestore: Firestore) { }


  getUser(id: string): Observable<User | undefined> {
    const document = doc(this.firestore, `users/${id}`);
    return docData(document, { idField: 'userId' }) as Observable<User | undefined>;
  }  

  getBadge(id: string): Observable<Badge | undefined> {
    const document = doc(this.firestore, `badge/${id}`);
    return docData(document, { idField: 'badgeId' }) as Observable<Badge | undefined>;
  } 
  
  getBalance(id: string): Observable<PointsBalance | undefined> {
    const document = doc(this.firestore, `pointsBalance/${id}`);
    return docData(document, { idField: 'pointBalanceId' }) as Observable<PointsBalance | undefined>;
  } 
}
