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
export class Hoteles {
  hotel1 = {
    name: 'Hotel Catalán',
    location: 'Barcelona, España',
    price: '€140 EUR',
    image: 'assets/hotel_catalan.jpg'
  };

  hotel2 = {
    name: 'The London Suites',
    location: 'Londres, Reino Unido',
    price: '£130 GBP',
    image: 'assets/hotel_london_suites.jpg'
  };

  hotel3 = {
    name: 'Paris Central Hotel',
    location: 'París, Francia',
    price: '€160 EUR',
    image: 'assets/hotel_paris_central.jpg'
  };

  hotel4 = {
    name: 'Venice Grand Hotel',
    location: 'Venecia, Italia',
    price: '€180 EUR',
    image: 'assets/hotel_venice_grand.jpg'
  };
}
