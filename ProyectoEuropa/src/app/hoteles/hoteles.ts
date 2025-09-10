import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hoteles',
  standalone: true,
  imports: [Header, RouterModule],
  templateUrl: './hoteles.html',
  styleUrls: ['./hoteles.css']
})
export class Hoteles { //Componente de Hoteles Señales
  hotel1 = {
    name: 'Hotel Mandarin Oriental, Barcelona',
    location: 'Barcelona, España',
    price: '€800 EUR',
    image: 'assets/HotelMandarin.webp' 
  };

  hotel2 = {
    name: 'The London Suites Hotel',
    location: 'Londres, Reino Unido',
    price: '£600 GBP',
    image: 'assets/HotelLondon.jpg'
  };

  hotel3 = {
    name: 'Hotel Lutetia',
    location: 'París, Francia',
    price: '€1000 EUR',
    image: 'assets/lutetia-paris.jpg'
  };

  hotel4 = {
    name: 'Hotel Danieli, Venice',
    location: 'Venecia, Italia',
    price: '€800 EUR',
    image: 'assets/HotelDanieli.jpg'
  };

  hotel5 = {
    name: ' Hilton Ámsterdam',
    location: 'Ámsterdam, Países Bajos',
    price: '€1000 EUR',
    image: 'assets/Hiltonamsterdam.jpg'
  };

  hotel6 = {
    name: 'AJWA Sultanahmet',
    location: 'Estambul, Turquía',
    price: '€900 EUR',
    image: 'assets/HotelEstambul.jpg'
  };

  hotel7 = {
    name: 'Hotel Grande Bretagne',
    location: 'Grecia, Atenas',
    price: '€3100 EUR',
    image: 'assets/HotelGrecia1.jpg'
  };

   hotel8 = {
    name: 'Mount Nelson, A Belmond Hotel',
    location: 'Ciudad del Cabo, Sudáfrica',
    price: '€2100 EUR',
    image: 'assets/belmon.jpg'
  };

   hotel9 = {
    name: 'Hotel Amalia',
    location: 'Vaticano, Roma',
    price: '€2500 EUR',
    image: 'assets/amalia-hotel.jpg'
  };





}
