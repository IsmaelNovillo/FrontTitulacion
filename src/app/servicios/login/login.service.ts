import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { LoginInterface, RespuestaLogin } from '../../modelos/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "http://localhost:8080/";
  private sesionIniciada: boolean = false;
  private message: string = '';


  constructor(private http: HttpClient) { }

  login(form: LoginInterface): Observable<RespuestaLogin> {
    const url = `${this.apiUrl}login`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<RespuestaLogin>(url, form, { headers }).pipe(
      tap((response) => {
        this.establecerSesionIniciada(true);
        this.guardarToken(response.token);
        this.guardarUserDato(response.Username);
        this.guardarMensaje(response.Message);

      }),

      catchError(this.handleError<RespuestaLogin>('login'))
    );
  }

  establecerSesionIniciada(value: boolean): void {
    this.sesionIniciada = value;
  }

  haIniciadoSesionUsuario(): boolean {
    return this.sesionIniciada;
  }

  cerrarSession(): void {
    this.establecerSesionIniciada(false);
    this.limpiarDatosSesion();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }



  //Manejo de Sesion y admin del Token
  //Autentificacion Servicios

  guardarToken(sesiontoken: string): void {
    localStorage.setItem('token', sesiontoken);
  }
  guardarUserDato(username: string): void {
    localStorage.setItem('user', username);
  }


  obtenerToken(): string {
    return localStorage.getItem('token') || '';
  }


  getAuthHeaders(): HttpHeaders {
    // Crear encabezados HTTP con el token de acceso
    const token = this.obtenerToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  recuperandoSesion(): Observable<any> {
    const headers = this.getAuthHeaders(); // Obtener los encabezados de autenticación con el token
    // Hacer una solicitud HTTP al servidor para obtener los datos del usuario utilizando los encabezados de autenticación
    return this.http.get<RespuestaLogin>(`${this.apiUrl}login`, { headers });
  }

  private guardarMensaje(mensaje: string): void {
    this.message = mensaje;
  }

  obtenerMensaje(): string {
    return this.message;
  }

  private limpiarDatosSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    localStorage.removeItem('identidad');
    localStorage.removeItem('identidadCliente');
    this.message = '';
  }





  // Otros Servicios
  //Este constructor y metodo va a almacenar el rol de usuario.
  private rolUsuario = new BehaviorSubject<string>('');
  // se  enviara elrol adquirido 
  enviarRol(dato: string): void {
    this.rolUsuario.next(dato);
  }
  //recibe el rol adquirido
  obtenerRol(): Observable<string> {
    return this.rolUsuario.asObservable();
  }

  //Este constructor y metodo va a almacenar el identificador.
  private identificadorObtenido = new
    BehaviorSubject<number>(0);
  // se  enviara el Identificador adquirido al registro del usuario 
  enviarIdentificador(dato: number): void {
    this.identificadorObtenido.next(dato);
  }
  //recibe el Identificador adquierido en Registro 
  obtenerIdentificador(): Observable<number> {
    return this.identificadorObtenido.asObservable();
  }

  //Este constructor y metodo va a almacenar estado de session
  private estadoLogin = new BehaviorSubject<boolean>(false);
  // se  enviara el estado del Login 
  enviarEstadoLogin(valor: boolean): void {
    this.estadoLogin.next(valor);
  }
  //recibe el estado del Login
  obtenerEstadoLogin(): Observable<boolean> {
    return this.estadoLogin.asObservable();
  }

  //Este constructor y metodo va a almacenar el nombre de usuario.
  private nombreUsuario = new BehaviorSubject<string>('');
  // se  enviara el nombre de usuario
  enviarUsuario(dato: string): void {
    this.nombreUsuario.next(dato);
  }
  //recibe el  nombre de usuario  
  obtenerUsuario(): Observable<string> {
    return this.nombreUsuario.asObservable();
  }

}
