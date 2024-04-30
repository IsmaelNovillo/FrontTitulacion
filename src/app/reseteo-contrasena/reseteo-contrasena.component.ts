import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../servicios/registro/registro.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reseteo-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reseteo-contrasena.component.html',
  styleUrl: './reseteo-contrasena.component.css'
})
export class ReseteoContrasenaComponent {
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private registroService: RegistroService,
    private mensajeService: MensajesEmergentesService,
    ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['xxxx'],
    });

  }

 

 
    enviandoDatosRecuperacion(){
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      const password = this.resetPasswordForm.value.password;
      this.enviarRecuperacion(email, password);
    }
  }

      enviarRecuperacion(email: string, password: string): void {

      this.registroService.reseteoContrasena(email, password).subscribe(
        response => {
          
          this.mensajeService.mostrarMensajePositivo('Correo de recuperación enviado con éxito:');
          // Aquí puedes manejar la respuesta del servidor si es necesario
        },
        error => {
          this.mensajeService.mostrarMensajeNegativo('Error al enviar el correo ')
          console.error('Error al enviar el correo de recuperación:', error);
          // Aquí puedes manejar el error si es necesario
        }
      );
    }
  


}
