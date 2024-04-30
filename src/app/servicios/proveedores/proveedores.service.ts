import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { ListarProveedores, RegistroProveedor } from '../../modelos/proveedores.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private urlListarProveedor= 'http://localhost:8080/api/v1/proveedor'

  constructor(private http: HttpClient) { }

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }

  obtenerProveedores(): Observable<ListarProveedores[]> {

    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListarProveedores[]>(`${this.urlListarProveedor}/listar`, {headers});
  }
}

@Injectable({
  providedIn: 'root'
})
export class CrearProoveedorService {

  private urlRegistrarProveedor= 'http://localhost:8080/api/v1/proveedor/crear'

  constructor(private http: HttpClient) { }

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  CreandoProveedor(proveedor: RegistroProveedor): Observable<RegistroProveedor> {
   // Obtenemos el token de autenticación
   const token = this.obtenerToken();

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   });

  return this.http.post<RegistroProveedor>(`${this.urlRegistrarProveedor}`, proveedor, {headers});
  }
  
}

