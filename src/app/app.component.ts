import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from "./components/shop/cart/cart.component";
import { environment } from '../environments/envirorments';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'mascovita-shop';

  constructor()
    {
    console.log(environment.firebase)
    }
  
}
