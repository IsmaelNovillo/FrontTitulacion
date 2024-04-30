import { Component, OnInit } from '@angular/core';
import { Usuario, } from '../modelos/usuario.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from '../servicios/registro/registro.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true, 
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  // Importa FormsModule aquí
  imports: [ReactiveFormsModule, CommonModule, FormsModule ],
  
})


export class RegistroComponent implements OnInit {

hidePassword: boolean = true;

verContrasena() {
      this.hidePassword = !this.hidePassword;
}


genero: any;
selectGenero(arg0: string) {
throw new Error('Method not implemented.');
}
  mensaje: string;
  usuarioForm: FormGroup;
  roles = ['ADMIN', 'USER'];

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private mensajesService: MensajesEmergentesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.usuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
      rol: [['ADMIN']], // Puedes establecer un valor predeterminado o dejarlo vacío según tus necesidades
    });
  }

  GuardandoUsuario() {
    const usuarioData = this.usuarioForm.value as Usuario;
  
    this.registroService.creadorUsuario(usuarioData).subscribe(
      (data) => {
        console.log(data);
        // Verificar si la respuesta del servidor indica éxito
        if (data && data.id) { // Ajusta esta condición según la estructura de tu respuesta del servidor
          this.router.navigate(['/verify-account']); // Redireccionar si el usuario se creó con éxito
          this.mensaje = 'Registro Correcto, revisa tu correo para verificar tu cuenta';
          this.mensajesService.mostrarMensajePositivo(this.mensaje);
          this.usuarioForm.reset();

        } else {
          console.error('Error: No se recibió una respuesta válida del servidor');
          this.mensajesService.mostrarMensajeNegativo('Error: No se pudo completar el registro');
        }
      },
      (error) => {
        // Manejar errores de la solicitud
        console.error('Error al registrar usuario:', error);
        if (error.status === 401) {
          this.mensajesService.mostrarMensajeNegativo('Error: Usuario no autorizado');
        } else if (error.status === 404) {
          this.mensajesService.mostrarMensajeNegativo('Error: Recurso no encontrado');
        } else {
          this.mensajesService.mostrarMensajeNegativo(
            'Error desconocido. Por favor, inténtalo de nuevo.'
          );
        }
        // No se realiza ninguna acción adicional en caso de error
      }
    );
  }
  

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.GuardandoUsuario();
    }
  }
}
