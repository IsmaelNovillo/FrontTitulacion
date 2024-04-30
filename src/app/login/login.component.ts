import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService, } from '../servicios/login/login.service';
import { LoginInterface, RespuestaLogin } from '../modelos/login.model';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginFormulario = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

   message: string | null = null;
   rolUsuario='USER';
   identificador= 1;

   

  constructor(
    private loginservice: LoginService,
    private router: Router, 
    private mensajesService: MensajesEmergentesService, 
    ) { }

  ngOnInit(): void { 

    this.enviadoRol(this.rolUsuario);
    this.enviandoIdentificador(this.identificador);

  }

  enviandoUsuario(valor: string): void{
    this.loginservice.enviarUsuario(valor);
     
  }
  enviadoRol(valor: string): void{
    this.loginservice.enviarRol(valor);
    localStorage.setItem('rol', valor);
  }

  enviandoestadoLogin():void{
    this.loginservice.enviarEstadoLogin(this.loginservice.haIniciadoSesionUsuario());
  }

  enviandoIdentificador(identidad: number): void{
    this.loginservice.enviarIdentificador(identidad);
    localStorage.setItem( 'identidad', identidad.toString());
  }




  LoginCargado() {
    if (this.loginFormulario.valid) {
      const formValue = this.loginFormulario.value as LoginInterface;
      // Enviar la solicitud con el tipo JSON
      this.loginservice.login(formValue).subscribe(
        (data) => {
          console.log(data);
          // Verificar si la respuesta contiene un token de sesión (o cualquier otro indicador de inicio de sesión exitoso)
          if (data && data.token) { // Suponiendo que la respuesta contiene un token
            // Redirige a la página deseada después de iniciar sesión
            this.loginservice.guardarToken(data.token);
            this.router.navigate(['/inicio']);
            // Marcar que el usuario ha iniciado sesión
            this.loginservice.haIniciadoSesionUsuario();
            // Mostrar mensaje de éxito o cualquier otro tratamiento necesario
            this.mensajesService.mostrarMensajePositivo(data.Message);
          } else {
            // En caso de que la respuesta no sea la esperada
            this.mensajesService.mostrarMensajeNegativo('Error: Usuario o contrasena incorrecta');
          }
        },
        (error) => {
          // Manejar errores de la solicitud
          console.error('Error al iniciar sesión:', error);
          this.mensajesService.mostrarMensajeNegativo('Error: revisa que tus datos sean correctos');
        }
      );
    }
  }
  


  hidePassword: boolean = true;

verContrasena() {
      this.hidePassword = !this.hidePassword;
}

}