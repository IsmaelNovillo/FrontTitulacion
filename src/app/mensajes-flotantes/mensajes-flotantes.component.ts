import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-mensajes-flotantes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mensajes-flotantes.component.html',
  styleUrl: './mensajes-flotantes.component.css'
})
export class MensajesFlotantesComponent implements OnInit {
  MensajeInformativo = false;
  MensajeInfor = '';
  MensajePositivo = false;
  MensajePosit= '';
  MensajeNegativo = false;
  MensajeNegat= '';



  constructor(private mensajesService: MensajesEmergentesService) {}

  ngOnInit(): void {
    this.mensajeInfor();
    this.mensajePosit();
    this.mensajeNegat();
    
  }

  mensajeInfor(){
    this.mensajesService.MensajeInfor.subscribe((mensaje: string) => {
      this.MensajeInfor = mensaje;
      this.MensajeInformativo = true;

      // Puedes ajustar el tiempo que quieres que el mensaje permanezca visible aquí
    setTimeout(() => this.CerrarVentana(), 5000); // Cerrar después de 5 segundos
    });
  }
  mensajePosit(){
    this.mensajesService.MensajePosit.subscribe((mensaje: string) => {
      this.MensajePosit = mensaje;
      this.MensajePositivo = true;

      // Puedes ajustar el tiempo que quieres que el mensaje permanezca visible aquí
    setTimeout(() => this.CerrarVentana(), 4000); // Cerrar después de 5 segundos
    });
  }

  mensajeNegat(){
    this.mensajesService.MensajeNegat.subscribe((mensaje: string) => {
      this.MensajeNegat = mensaje;
      this.MensajeNegativo = true;

      // Puedes ajustar el tiempo que quieres que el mensaje permanezca visible aquí
    setTimeout(() => this.CerrarVentana(), 4000); // Cerrar después de 5 segundos
    });
  }


  CerrarVentana() {
    this.MensajeInformativo = false;
    this.MensajePositivo = false;
    this.MensajeNegativo = false;
  }
}
