import { Injectable } from '@angular/core';
import { RespuestaCorreo, RespuestaRegistro, Usuario, } from '../../modelos/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ResetModelo, RespuestaReset } from '../../modelos/login.model';



@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlregist = 'http://localhost:8080/create';
  private urlreset = 'http://localhost:8080/reset-password'

  constructor(private http: HttpClient) {

  }

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string {
    return localStorage.getItem('token') || '';
  }


  creadorUsuario(usuario: Usuario): Observable<RespuestaRegistro> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<RespuestaRegistro>(this.urlregist, usuario, { headers }).pipe(
      tap((response) => {

      }),
      catchError(this.handleError<RespuestaRegistro>('login'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  verificarCuenta(email: string, otp: string) {
    const urlverifique = `http://localhost:8080/verify-account?email=${email}&otp=${otp}`;
    return this.http.put(urlverifique, {}, { responseType: 'text' });
  }

  reseteoContrasena(email: string, password: string): Observable<RespuestaReset> {
    const reseteo = `${this.urlreset}?email=${email}&password=${password}`;
    return this.http.get<RespuestaReset>(reseteo);
  }

}
