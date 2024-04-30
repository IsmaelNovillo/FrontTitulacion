import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreadorImagenes, ListadorImagenes } from '../../modelos/imagenes.model';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  private urlCrear ='http://localhost:8080/api/v1/imagen/crear';
  private urlBasic ='http://localhost:8080/api/v1/imagen';
  private urlListarTodas = 'http://localhost:8080/api/v1/imagen/listar';
  private urlActualizar= 'http://localhost:8080/api/v1/imagen';


  constructor(private http: HttpClient) { }

    //Obteniendo el Token para las Solicitudes.

    private obtenerToken(): string{
      return localStorage.getItem('token') || '';
    }

  // Método para obtener todos los datos
  ObtenerImagenes(): Observable<ListadorImagenes[]> {
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ListadorImagenes[]>(this.urlListarTodas, {headers});
  }

  // Método para obtener un solo dato por ID
  obteniendoImagen(idimg: string): Observable<Object> {
        // Obtenemos el token de autenticación
        const token = this.obtenerToken();

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
    return this.http.get(`${this.urlBasic}/${idimg}`, {headers});
  }

  // Método para crear un nuevo dato
  crearImagen(imagen: CreadorImagenes): Observable<CreadorImagenes> {
        // Obtenemos el token de autenticación
        const token = this.obtenerToken();

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
    return this.http.post<CreadorImagenes>(this.urlCrear, imagen, {headers});
  }

  // Método para actualizar un dato existente
  actualizarImagen(idimg: string, imagen: CreadorImagenes): Observable<CreadorImagenes> {

        // Obtenemos el token de autenticación
        const token = this.obtenerToken();

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
    return this.http.put<CreadorImagenes>(`${this.urlActualizar}/${idimg}`, imagen, {headers});
  }

  // Método para eliminar un dato
  borrarImagen(id: string): Observable<Object> {
        // Obtenemos el token de autenticación
        const token = this.obtenerToken();

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
    return this.http.delete(`${this.urlBasic}/${id}`, {headers});
  } 




}
