import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActualizarCliente, CrearCliente, ListarCliente } from '../../modelos/clientes.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlCrear='http://localhost:8080/api/v1/client/crear';
  private urlListar= 'http://localhost:8080/api/v1/client/listar';
  private urListarID='http://localhost:8080/api/v1/client/'
  private urlActualizar= 'http://localhost:8080/api/v1/client/';


  constructor(
    private http: HttpClient,

  ) { }

  //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }

  // Método para obtener todos los datos
  ObtenerClientes(): Observable<ListarCliente[]> {

    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListarCliente[]>(this.urlListar, {headers});
  }

  // Método para obtener un solo dato por ID
  obteniendoCliente(idcliente: number): Observable<ListarCliente> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListarCliente>(`${this.urListarID}${idcliente}`, {headers});
  }

  // Método para crear un nuevo dato
  crearCliente(nuevoCleinte: CrearCliente): Observable<ListarCliente> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<ListarCliente>(this.urlCrear, nuevoCleinte, {headers});
  }

  // Método para actualizar un dato existente
  actualizarCliente(idCliente: number, cliente: ActualizarCliente): Observable<ActualizarCliente> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<ActualizarCliente>(`${this.urlActualizar}${idCliente}`, cliente, {headers});
  }

  // Método para eliminar un dato
  borrarCliente(idCliente: number): Observable<Object> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.urListarID}${idCliente}`, {headers});
  } 



 



}

