import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { CrearEmpresa, ListarEmpresas,  } from '../../modelos/empresas.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService{

  private urlRegistroEmpresa = 'http://localhost:8080/api/v1/empresa/crear';
  private urlActualizaEmpresa= `http://localhost:8080/api/v1/empresa/`;

  constructor(
    private http: HttpClient, 
    
    ) { }
  
    //Obteniendo el Token para las Solicitudes.

  private obtenerToken(): string{
    return localStorage.getItem('token') || '';
  }


  constheaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  creandoEmpresa(empresa: CrearEmpresa): Observable<CrearEmpresa>{
    
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post<CrearEmpresa>(`${this.urlRegistroEmpresa}`, empresa,{headers});
    return   this.http.post<ListarEmpresas>(this.urlRegistroEmpresa, empresa,{ headers }).pipe(
      tap((response) => {
        

      }),
    );
  
}

  actualizandoEmmpresa(empresa: CrearEmpresa){ 
    
    // Obtenemos el token de autenticación
    const token = this.obtenerToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    this.http.post<CrearEmpresa>(`${this.urlActualizaEmpresa}`, empresa, {headers});
    return   this.http.post<ListarEmpresas>(this.urlActualizaEmpresa, empresa,{ headers }).pipe(
      tap((response) => {
        

      }),
    );

  }
}
