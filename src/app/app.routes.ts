import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './components/shop/product-detail/product-detail.component';
import { CartResumeComponent } from './components/shop/cart-resume/cart-resume.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorDefaultComponent } from './pages/error-default/error-default.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'shop/:category', component: ShopComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'cart-resume', component: CartResumeComponent },
    { path: 'info', component: InfoComponent },
    { path: 'contact', component: ContactComponent },
    {
      path:'club',
      loadChildren: () =>
      import('./club/routes/club.routes').then(m => m.clubRoutes)
    },
    { path: '**', component: ErrorDefaultComponent }

  ];
