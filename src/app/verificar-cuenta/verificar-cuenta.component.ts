import { Component } from '@angular/core';
import { RegistroService } from '../servicios/registro/registro.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-verificar-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verificar-cuenta.component.html',
  styleUrl: './verificar-cuenta.component.css'
})
export class VerificarCuentaComponent {


  constructor(
    private route: ActivatedRoute, 
    private verificacionService: RegistroService,
    private mensajes: MensajesEmergentesService,
    private router: Router,

    ) {
      this.route.queryParams.subscribe(params => {
      const email = params['email'];  
      const otp = params['otp'];
      if (email && otp) {
        this.verificarCuenta(email, otp);
      }
    });
  }

  verificarCuenta(email: string, otp: string) {
    this.verificacionService.verificarCuenta(email, otp).subscribe(
      (response) => {
        // Manejar la respuesta del servidor aquí
        console.log('Cuenta verificada correctamente', response);
        this.mensajes.mostrarMensajePositivo('Verificacion Correcta: ' + response);
        this.router.navigate(['/seguridad/login-user']);

      },
      (error) => {
        console.error('Error al verificar la cuenta', error);
        this.mensajes.mostrarMensajeNegativo('Error de Verificacion: ' + error);

      }
    );
  }
}

