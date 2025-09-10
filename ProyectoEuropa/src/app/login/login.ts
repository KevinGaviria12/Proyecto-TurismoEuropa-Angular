import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Header],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  mode: 'login' | 'register' = 'login';

  // login fields
  username = '';
  password = '';

  // register fields
  regUser = '';
  regPassword = '';

  // message / error
  message = '';

  constructor(private router: Router) {}

  toggleMode(m?: 'login'|'register') {
    this.message = '';
    this.mode = m ?? (this.mode === 'login' ? 'register' : 'login');
  }

  register() {
    this.message = '';
    if (!this.regUser || !this.regPassword) {
      this.message = 'Por favor completa usuario y contraseña.';
      return;
    }

    // obtener usuarios guardados
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    if (users[this.regUser]) {
      this.message = 'Ese usuario ya existe. Elige otro.';
      return;
    }

    // guardar nuevo usuario
    users[this.regUser] = this.regPassword;
    localStorage.setItem('pe_users', JSON.stringify(users));

    this.message = 'Registro correcto. Ahora inicia sesión.';
    this.regUser = '';
    this.regPassword = '';
    this.mode = 'login';
  }

  login() {
    this.message = '';
    if (!this.username || !this.password) {
      this.message = 'Ingresa usuario y contraseña.';
      return;
    }

    // acceso admin fijo
    if (this.username.toLowerCase() === 'admin' && this.password === '1234') {
      // simulación de "login" - redirige a home
      this.router.navigate(['/home']);
      return;
    }

    // validar contra localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    if (users[this.username] && users[this.username] === this.password) {
      this.router.navigate(['/home']);
      return;
    }

    this.message = 'Credenciales incorrectas.';
  }
}
