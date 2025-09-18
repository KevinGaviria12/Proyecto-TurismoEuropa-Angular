import { Component, signal } from '@angular/core';
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

  // Señal que maneja si estamos en "login" o en "registro"
  protected readonly mode = signal<'login' | 'register'>('login');

  // Señales reactivas para los campos del formulario
  protected readonly username = signal('');      // usuario login
  protected readonly password = signal('');      // contraseña login
  protected readonly regUser = signal('');       // usuario registro
  protected readonly regPassword = signal('');   // contraseña registro

  // Señal para mostrar mensajes de error/éxito
  protected readonly message = signal('');

  // Lista para el *ngFor (ejemplo de tips al usuario)
  protected readonly tips = [
    'Usa una contraseña segura',
    'No compartas tus datos',
    'Recuerda cerrar sesión en computadores públicos'
  ];

  constructor(private router: Router) {}

  // Alterna entre login y registro
  toggleMode(m?: 'login' | 'register') {
    this.message.set(''); // limpiamos mensajes

    // SWITCH para decidir el modo
    switch (m) {
      case 'login':
        this.mode.set('login');
        break;
      case 'register':
        this.mode.set('register');
        break;
      default:
        // si no hay parámetro, alternamos con IF
        this.mode.set(this.mode() === 'login' ? 'register' : 'login');
        break;
    }
  }

  // Función para registrar usuario
  register() {
    this.message.set('');

    // IF: validamos campos vacíos
    if (!this.regUser() || !this.regPassword()) {
      this.message.set('Por favor completa usuario y contraseña.');
      return;
    }

    // Obtenemos usuarios guardados en localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    // IF: validamos si el usuario ya existe
    if (users[this.regUser()]) {
      this.message.set('Ese usuario ya existe. Elige otro.');
      return;
    }

    // Guardamos nuevo usuario
    users[this.regUser()] = this.regPassword();
    localStorage.setItem('pe_users', JSON.stringify(users));

    // Mensaje de éxito
    this.message.set('Registro correcto. Ahora inicia sesión.');

    // Limpiamos campos y cambiamos modo
    this.regUser.set('');
    this.regPassword.set('');
    this.mode.set('login');
  }

  // Función para iniciar sesión
  login() {
    this.message.set('');

    // IF: validamos campos vacíos
    if (!this.username() || !this.password()) {
      this.message.set('Ingresa usuario y contraseña.');
      return;
    }

    // Acceso rápido fijo para admin
    if (this.username().toLowerCase() === 'admin' && this.password() === '1234') {
      this.router.navigate(['/home']); // redirige a home
      return;
    }

    // Obtenemos usuarios de localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    // FOR: recorremos las claves de usuarios para buscar coincidencia
    for (const user in users) {
      if (user === this.username() && users[user] === this.password()) {
        this.router.navigate(['/home']); // login correcto
        return;
      }
    }

    // Credenciales incorrectas
    this.message.set('Credenciales incorrectas.');
  }
}
