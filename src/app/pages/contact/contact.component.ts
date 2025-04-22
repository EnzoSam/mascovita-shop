import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  sendMessage(nombre: string, mensaje: string) {
    let texto = '';
    if(nombre)
      texto = `Hola! soy ${nombre}. \n ${mensaje}`;
    const url = `https://wa.me/5493751448459/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }
}
