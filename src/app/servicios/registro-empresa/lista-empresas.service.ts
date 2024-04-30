import { Injectable,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { ActualizarEmpresa, CrearEmpresa, ListarEmpresas } from '../../modelos/empresas.model';

@Injectable({
  providedIn: 'root'
})
export class ListaEmpresasService {

  

  private urlListar= 'http://localhost:8080/api/v1/empresa'

  constructor(private http: HttpClient) { }

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }


  obtenerEmpresas(): Observable<ListarEmpresas[]> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ListarEmpresas[]>(`${this.urlListar}/listar`, {headers});
  }

}

@Injectable({
  providedIn: 'root'
})
export class MiEmpresaService {

  private IDEmpresa: number=5 ;


  private urlCrear='http://localhost:8080/api/v1/empresa/crear';
  private urlListar= 'http://localhost:8080/api/v1/empresa/listar';
  private urlID='http://localhost:8080/api/v1/empresa/'
  private urlActualizar= 'http://localhost:8080/api/v1/empresa/';
  
  constructor(
    private http: HttpClient, 
    private loginService: LoginService) { }

    //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }



  // Método para obtener todos los datos
  obtenerEmpresas(): Observable<ListarEmpresas[]> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListarEmpresas[]>(this.urlListar, {headers});
  }

  // Método para obtener un solo dato por ID
  obtenerEmpresa(idempresa: number): Observable<ListarEmpresas> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<ListarEmpresas>(`${this.urlID}${idempresa}`, {headers});
  }
  

  // Método para crear un nuevo dato
  crearEmpresa(nuevaEmpresa: CrearEmpresa): Observable<CrearEmpresa> {

    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<CrearEmpresa>(this.urlCrear, nuevaEmpresa, {headers});
  }

  // Método para actualizar un dato existente
  actualizarEmpresa(idEmpresa: number, imagen: ActualizarEmpresa): Observable<ActualizarEmpresa> {

    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ActualizarEmpresa>(`${this.urlActualizar}${idEmpresa}`, imagen, {headers});
  }

  // Método para eliminar un dato
  borrarEmpresa(idEmpresa: number): Observable<Object> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.urlID}${idEmpresa}`, {headers});
  } 

}