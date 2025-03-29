import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './components/shop/product-detail/product-detail.component';
import { CartResumeComponent } from './components/shop/cart-resume/cart-resume.component';
export const routes: Routes = [
    { path: '', component: ShopComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart-resume', component: CartResumeComponent }
  ];
