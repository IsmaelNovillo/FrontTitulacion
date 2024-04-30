import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../servicios/clientes/clientes.service';
import { CrearCliente, ListarCliente } from '../modelos/clientes.model';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-informacion-personal',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './informacion-personal.component.html',
  styleUrl: './informacion-personal.component.css'
})
export class InformacionPersonalComponent implements OnInit {

  usuarioEsEmpresa: boolean = false;
  actualizaInfoUserForm: FormGroup;
  userTempoActualizar: CrearCliente;
  crearClienteForm: FormGroup;
  crearPerfil: boolean = false;
  actualizarPerfil: boolean = false;
  clienteUser: ListarCliente;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private clienteService: ClientesService,
    private formConstructor: FormBuilder,
    private mensajes: MensajesEmergentesService,
    ){}

ngOnInit(): void {
    this.LogicaBotonPerfilEmpresa();
    this.iniciarFormActualizacion();
    this.iniciarFormularioCrear();
    this.cargandoCliente();
  }

  creandoCliente(){
    const nuevoCliente = this.crearClienteForm.value as CrearCliente;
    this.clienteService.crearCliente(nuevoCliente).subscribe(
      (clienteOK)=>{
        this.mensajes.mostrarMensaje('Datos Guardados Exitosamente');
        this.crearClienteForm.reset();
        localStorage.setItem('identidadCliente', clienteOK.idcliente.toString());
        this.cargandoCliente();
        this.crearPerfil=false;
        this.actualizarPerfil=true;

      }
    )

  
  }
 
  cargandoCliente(){
    const id = localStorage.getItem('identidadCliente')
    if(id !== null){
      const idCliente = parseInt(id);
      this.clienteService.obteniendoCliente(idCliente).subscribe(
        (cliente)=>{
          this.clienteUser= cliente;
          this.actualizarPerfil = true;
        });
    } else{
      this.mensajes.mostrarMensaje('Registra tus datos completos');
      this.crearPerfil = true;

    }
  }

  actualizandoCliente(){
    const id= localStorage.getItem('identidadCliente');
    if(id !== null){
      
    const idCliente = parseInt(id);
    const clienteActualizado =this.actualizaInfoUserForm.value;
    this.clienteService.actualizarCliente(idCliente, clienteActualizado).subscribe(
      (respuesta)=>{
        this.actualizaInfoUserForm.reset();
        this.mensajes.mostrarMensaje('El Cliente '+ respuesta.nomCliente + ' ha sido actualizado con exito');
        this.cargandoCliente();
      },
      (error)=>{
        this.mensajes.mostrarMensaje('Error Obtenido: '+ error);
      });
    }
  }
  //Actualizacion del perfil cliente
  iniciarFormActualizacion() {
    this.actualizaInfoUserForm = this.formConstructor.group({
      rucCliente: [null, Validators.required],
      nomCliente: ['', Validators.required],
      apelCliente: ['', Validators.required],
      dirCliente: ['', Validators.required],
      telCliente: [null, Validators.required],
      mailCliente: ['', Validators.required],
    });
  }
  iniciarFormularioCrear(){
    this.crearClienteForm = this.formConstructor.group({
      rucCliente: [null, Validators.required],
      nomCliente: ['', Validators.required],
      apelCliente: ['', Validators.required],
      dirCliente: ['', Validators.required],
      telCliente: [null, Validators.required],
      mailCliente: ['', Validators.required],
      iduser: [null],
      reservacionid: [null],

    });

  }

  editarCliente( clienteUser: ListarCliente) {
    this.userTempoActualizar = clienteUser;
    this.actualizaInfoUserForm .patchValue({
      rucCliente: this.userTempoActualizar.rucCliente,
      nomCliente: this.userTempoActualizar.nomCliente,
      apelCliente: this.userTempoActualizar.apelCliente,
      dirCliente: this.userTempoActualizar.dirCliente,
      telCliente:this.userTempoActualizar.telCliente,
      mailCliente: this.userTempoActualizar.mailCliente,
      iduser: null,
      reservacionid: null,


    })
  }

LogicaBotonPerfilEmpresa(){
    const rol = localStorage.getItem('rol');
      if (rol ==='ADMIN' || rol === 'EMPRENDEDOR') { 
        this.usuarioEsEmpresa = true;
      } else{
      }
}

cerrarSession(){
  this.loginService.cerrarSession();
  this.router.navigate(['/inicio']);
}

verPassword: any;
habilitarEdicion() {
throw new Error('Method not implemented.');
}
passwordActual: any;
mostrarContrasena() {
throw new Error('Method not implemented.');
}



}
