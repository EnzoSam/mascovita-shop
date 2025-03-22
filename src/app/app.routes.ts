import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './components/shop/product-detail/product-detail.component';
export const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'product/:id', component: ProductDetailComponent }
  ];
