import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesEmergentesService {

  MensajeInfor = new Subject<string>();

  mostrarMensaje(mensaje: string) {
    this.MensajeInfor.next(mensaje);
  }

  MensajePosit = new Subject<string>();

  mostrarMensajePositivo(mensaje: string) {
    this.MensajePosit.next(mensaje);
  }

  MensajeNegat = new Subject<string>();

  mostrarMensajeNegativo(mensaje: string) {
    this.MensajeNegat.next(mensaje);
  }

  
}
