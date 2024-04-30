import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ListarPlanRegistro, CrearPlanRegistro, ActualizarPlanRegistro } from '../../modelos/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanRegistroService {

  private urlCrear: 'http://localhost:8080/api/v1/plan/crear';
  private urlListar: 'http://localhost:8080/api/v1/plan/listar';
  private urlID: 'http://localhost:8080/api/v1/plan/';
  private urlBorrar: 'http://localhost:8080/api/v1/plan/';

constructor(
  private http: HttpClient,
){

}

//Obteniendo el Token para las Solicitudes.

private obtenerToken(): string{
  return localStorage.getItem('token') || '';
}

// Método para obtener todos los datos
ObtenerPlanes(): Observable<ListarPlanRegistro[]> {

  // Obtenemos el token de autenticación
  const token = this.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<ListarPlanRegistro[]>(this.urlListar, {headers});
}

// Método para obtener un solo dato por ID
obtenerPlan(idplan: number): Observable<Object> {

  // Obtenemos el token de autenticación
  const token = this.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.get(`${this.urlID}${idplan}`, {headers});
}

// Método para crear un nuevo dato
crearPlan(nuevoPlan: CrearPlanRegistro): Observable<CrearPlanRegistro> {

  // Obtenemos el token de autenticación
  const token = this.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.post<CrearPlanRegistro>(this.urlCrear, nuevoPlan, {headers});
}

// Método para actualizar un dato existente
actualizarPlan(idplan: number, planregistro: ActualizarPlanRegistro): Observable<ActualizarPlanRegistro> {
  // Obtenemos el token de autenticación
  const token = this.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<ActualizarPlanRegistro>(`${this.urlID}${idplan}`, planregistro, {headers});
}

// Método para eliminar un dato
borrarPlan(idplan: number): Observable<Object> {

  // Obtenemos el token de autenticación
  const token = this.obtenerToken();

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.delete(`${this.urlID}${idplan}`, {headers});
} 



  //Este constructor y metodo va a almacenar el valor del boton del plan de registro.

  private planAdquiridoSubject = new
  BehaviorSubject<number>(0);

// se  enviara el Plan adquirido al registro del usuario 

  enviarPlan(dato: number): void{
    this.planAdquiridoSubject.next(dato);
  }
//recibe el Plan adquierido en Registro 

  obtenerPlanR(): Observable<number>{ 
   
    return this.planAdquiridoSubject.asObservable();
    
  }
  



}
