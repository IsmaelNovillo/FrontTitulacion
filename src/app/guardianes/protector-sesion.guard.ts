
import { Inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Route, Router } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';
import { Observable, of } from 'rxjs';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService, 
    private router: Router) {}

  canActivate(): boolean {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
    if (token && user) {
      return true;
    } else {
      // No autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['/seguridad/login-user']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class EmpresaGuard implements CanActivate {

  usuarioRol: string = '';

  constructor(
    private router: Router, 
    private mensajesService: MensajesEmergentesService) {}

  canActivate(): Observable<boolean> {
    const rol = localStorage.getItem('rol');
        if (rol !== 'EMPRENDEDOR') {
          return of(true); // Permitir acceso si el rol no es 'ADMIN'
        } else {
          this.router.navigate(['/paneles/mi-empresa']);
          this.mensajesService.mostrarMensaje('Ya estas registrado como Empresa');
          return of(false); // Bloquear acceso si el rol es 'ADMIN'
        }
  }
}

@Injectable({
  providedIn: 'root',
})
export class SuperUserGuard implements CanActivate {

  usuarioRol: string = '';

  constructor(
    private router: Router, 
    private mensajesService: MensajesEmergentesService) {}

  canActivate(): Observable<boolean> {
    const usuario = localStorage.getItem('user');
        if (usuario === 'ismael') {
          return of(true); // Permitir acceso si el rol no es 'ADMIN'
        } else {
          this.router.navigate(['/inicio']);
          this.mensajesService.mostrarMensaje('No eres Administrador');
          return of(false); // Bloquear acceso si el rol es 'ADMIN'
        }
  }
}
@Injectable({
  providedIn: 'root',
})
export class VerificarCuentaGuard implements CanActivate {
  constructor(
    private router: Router, 
    private mensajesService: MensajesEmergentesService
  ){}

  canActivate(): Observable <boolean>{
    const usuario = localStorage.getItem('user');
        if (usuario === 'ismael') {
          return of(true); // Permitir acceso si el rol no es 'ADMIN'
        } else {
          this.router.navigate(['/inicio']);
          this.mensajesService.mostrarMensaje('No eres Administrador');
          return of(false); // Bloquear acceso si el rol es 'ADMIN'
        }
    
  }
}
