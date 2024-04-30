import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-acerca-de-nosotros',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './acerca-de-nosotros.component.html',
  styleUrl: './acerca-de-nosotros.component.css'
})
export class AcercaDeNosotrosComponent implements OnInit {

  formularioConsulta: FormGroup;

  constructor(private fb: FormBuilder, 
    private mensajesService: MensajesEmergentesService) {
    this.formularioConsulta = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  enviarConsulta() {
    if (this.formularioConsulta.valid) {
      // Aquí podrías enviar el formulario de consulta a través de tu servicio
      this.mensajesService.mostrarMensaje('Consulta enviada con éxito. Nos pondremos en contacto pronto.');
      this.formularioConsulta.reset();
    } else {
      this.mensajesService.mostrarMensaje('Por favor, completa todos los campos correctamente.');
    }
  }
}
