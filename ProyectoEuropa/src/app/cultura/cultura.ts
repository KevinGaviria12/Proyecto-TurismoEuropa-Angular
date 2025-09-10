import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-cultura',
  standalone: true,
  imports: [Header],
  templateUrl: './cultura.html',
  styleUrls: ['./cultura.css']
})
export class Cultura {}
