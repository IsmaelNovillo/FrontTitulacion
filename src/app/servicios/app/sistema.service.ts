import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SistemaServicio{


  //Este constructor y metodo va activar el chat soporte
 private mostrarChatSporte = new BehaviorSubject<boolean>(false);
 // se  enviara el estado del Login 
  enviarActivacionChat(activacion: boolean): void{
    this.mostrarChatSporte.next(activacion);
  }
 //recibe la activacion del soporte
  ObtenerActivacionChat(): Observable<boolean>{
    return this.mostrarChatSporte.asObservable();  
  }

  constructor() {}

  

 
}
