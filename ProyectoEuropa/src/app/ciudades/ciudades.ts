import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-ciudades',
  standalone: true,
  imports: [RouterModule,Header], 
  templateUrl: './ciudades.html',
  styleUrls: ['./ciudades.css']
})
export class ciudades { } 
