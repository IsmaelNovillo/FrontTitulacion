import { Component, OnInit } from '@angular/core';
import { CrearCliente, ListarCliente } from '../../modelos/clientes.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes/clientes.service';
import { MensajesEmergentesService } from '../../servicios/mensajes/mensajes-emergentes.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-clientes.component.html',
  styleUrl: './admin-clientes.component.css'
})
export class AdminClientesComponent implements OnInit{
  habilitarRegistroCliente: boolean = false;
  habilitarActualizaCliente: boolean =false;
  todosClientes: ListarCliente[]= []; 
  nuevoCliente: CrearCliente;
  formularioCrearCliente: FormGroup;
  formActualizaCliente: FormGroup;
  clienteTemporalparaActualizar: CrearCliente; //utilizado para actualizar datos del clietnte
  idActualizable: number;

  constructor (
    private clientesService: ClientesService,
    private formBuilder: FormBuilder,
    private mensajesService: MensajesEmergentesService,

  ){}

  ngOnInit(){
    this.obtenerClientes();
    this.iniciarFormActualizacion();
    this.iniciarFormularioCrear();

  }

  iniciarFormularioCrear(){
    this.formularioCrearCliente = this.formBuilder.group({
      rucCliente: [null, Validators.required],
      nomCliente: ['', Validators.required],
      apelCliente: ['', Validators.required],
      dirCliente: ['', Validators.required],
      telCliente: [null, Validators.required],
      mailCliente: ['', Validators.required],
    });
  }

  iniciarFormActualizacion(){
    this.formActualizaCliente = this.formBuilder.group({
      rucCliente: [null, Validators.required],
      nomCliente: ['', Validators.required],
      apelCliente: ['', Validators.required],
      dirCliente: ['', Validators.required],
      telCliente: [null, Validators.required],
      mailCliente: ['', Validators.required],
    });
  }

  obtenerClientes(){
    this.clientesService.ObtenerClientes().subscribe(
      (clientesTotal)=>{
        this.todosClientes=clientesTotal
      }
    )
  }

  creadorCliente(){
    const clienteAgg= this.formularioCrearCliente.value as CrearCliente;

    this.clientesService.crearCliente(clienteAgg).subscribe(
      (respuesta)=>{
        this.mensajesService.mostrarMensaje('Registro del cliente: '+ respuesta.nomCliente + ' es Exitoso');
        this.formularioCrearCliente.reset();
        this.habilitarRegistroCliente=false;
        this.obtenerClientes();
    }, 
    (error)=>{
      this.mensajesService.mostrarMensaje('Error de Registro: '+ error);
    }
    );
  }

  editarCliente(id: number, cliente: ListarCliente){
    this.habilitarActualizaCliente=true;
    this.clienteTemporalparaActualizar=cliente;
    this.formActualizaCliente.patchValue({
      rucCliente: this.clienteTemporalparaActualizar.rucCliente,
      nomCliente: this.clienteTemporalparaActualizar.nomCliente,
      apelCliente: this.clienteTemporalparaActualizar.apelCliente,
      dirCliente: this.clienteTemporalparaActualizar.dirCliente,
      telCliente: this.clienteTemporalparaActualizar.telCliente,
      mailCliente: this.clienteTemporalparaActualizar.mailCliente,
    })

    this.idActualizable=id;
  }

  actualizacionCliente(){
    const clienteActualizado =this.formActualizaCliente.value;
    this.clientesService.actualizarCliente(this.idActualizable, clienteActualizado).subscribe(
      (respuesta)=>{
        this.formActualizaCliente.reset();
        this.habilitarActualizaCliente=false;
        this.mensajesService.mostrarMensaje('El Cliente '+ respuesta.nomCliente + ' ha sido actualizado con exito');
        this.obtenerClientes();
      },
      (error)=>{
        this.mensajesService.mostrarMensaje('Error Obtenido: '+ error);
      });
  }

  borradorCliente(idCliente: number){
    this.clientesService.borrarCliente(idCliente).subscribe(
      (respuesta)=>{
        this.mensajesService.mostrarMensaje('Cliente borrado con Éxito ');
        this.obtenerClientes();
      },
      (error)=>{
        this.mensajesService.mostrarMensaje('Error Obtenido: ' + error);
      });
  }

  habilitarAgregarCliente(){
    this.habilitarRegistroCliente=true;
  }
  cancelarAgregarCliente(){
    this.habilitarActualizaCliente=false
    this.habilitarRegistroCliente=false
  }
  


}
