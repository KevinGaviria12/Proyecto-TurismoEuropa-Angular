import { Component, signal } from '@angular/core'; //  importamos signal de Angular
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

  // señal que maneja si estamos en "login" o en "registro"
  protected readonly mode = signal<'login' | 'register'>('login');

  // señales reactivas para los campos del formulario
  protected readonly username = signal('');      // usuario login
  protected readonly password = signal('');      // contraseña login
  protected readonly regUser = signal('');       // usuario registro
  protected readonly regPassword = signal('');   // contraseña registro

  // señal para mostrar mensajes de error/éxito en la vista
  protected readonly message = signal('');

  constructor(private router: Router) {}

  // alterna entre login y registro
  toggleMode(m?: 'login' | 'register') {
    this.message.set(''); // limpiamos mensajes
    this.mode.set(m ?? (this.mode() === 'login' ? 'register' : 'login'));
  }

  // función para registrar usuario
  register() {
    this.message.set('');
    if (!this.regUser() || !this.regPassword()) {
      this.message.set('Por favor completa usuario y contraseña.');
      return;
    }

    // obtenemos usuarios guardados en localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    //  validamos si el usuario ya existe
    if (users[this.regUser()]) {
      this.message.set('Ese usuario ya existe. Elige otro.');
      return;
    }

    // guardamos nuevo usuario en localStorage
    users[this.regUser()] = this.regPassword();
    localStorage.setItem('pe_users', JSON.stringify(users));

    // mensaje de éxito
    this.message.set('Registro correcto. Ahora inicia sesión.');

    //  limpiamos campos y cambiamos a modo login
    this.regUser.set('');
    this.regPassword.set('');
    this.mode.set('login');
  }

  // función para iniciar sesión
  login() {
    this.message.set('');
    if (!this.username() || !this.password()) {
      this.message.set('Ingresa usuario y contraseña.');
      return;
    }

    // acceso rápido fijo para admin
    if (this.username().toLowerCase() === 'admin' && this.password() === '1234') {
      this.router.navigate(['/home']); // redirige a home
      return;
    }

    //  obtenemos usuarios guardados en localStorage
    const raw = localStorage.getItem('pe_users');
    const users = raw ? JSON.parse(raw) : {};

    // validamos credenciales contra los usuarios guardados
    if (users[this.username()] && users[this.username()] === this.password()) {
      this.router.navigate(['/home']); // login correcto
      return;
    }

    // credenciales incorrectas
    this.message.set('Credenciales incorrectas.');
  }
}
