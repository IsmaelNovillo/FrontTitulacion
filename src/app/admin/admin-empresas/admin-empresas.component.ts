import { Component, OnInit } from '@angular/core';
import { CrearEmpresa, ListarEmpresas } from '../../modelos/empresas.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MiEmpresaService } from '../../servicios/registro-empresa/lista-empresas.service';
import { MensajesEmergentesService } from '../../servicios/mensajes/mensajes-emergentes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-empresas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-empresas.component.html',
  styleUrl: './admin-empresas.component.css'
})
export class AdminEmpresasComponent implements OnInit {

  habilitarRegistroEmpresa: boolean = false;
  habilitarActualizaEmpresa: boolean =false;
  todasEmpresa: ListarEmpresas[]= [];
  nuevoEmpresa: CrearEmpresa;
  formularioCrearEmpresa: FormGroup;
  formActualizaEmpresa: FormGroup;
  empresaTemporalparaActualizar: CrearEmpresa; //utilizado para actualizar datos del clietnte
  idActualizable: number;

  constructor (
    private empresaService: MiEmpresaService,
    private formBuilder: FormBuilder,
    private mensajesService: MensajesEmergentesService,

  ){}

  ngOnInit(){
    this.obtenerEmpresas();
    this.iniciarFormActualizacion();
    this.iniciarFormularioCrear();

  }

  iniciarFormularioCrear(){
    this.formularioCrearEmpresa = this.formBuilder.group({
      nomepresa: ['', Validators.required],
      dirempresa: ['', Validators.required],
      ciudadempresa: ['', Validators.required],
      paisempresa: ['', Validators.required],
      
    });
  }

  iniciarFormActualizacion(){
    this.formActualizaEmpresa = this.formBuilder.group({
      nomepresa: ['', Validators.required],
      dirempresa: ['', Validators.required],
      ciudadempresa: ['', Validators.required],
      paisempresa: ['', Validators.required],
    });
  }

  obtenerEmpresas(){
    this.empresaService.obtenerEmpresas().subscribe(
      (empresasTotal)=>{
        this.todasEmpresa=empresasTotal;
      }
    )
  }

  creadorEmpresa(){
    const empresaAgg= this.formularioCrearEmpresa.value as CrearEmpresa;

    this.empresaService.crearEmpresa(empresaAgg).subscribe(
      (respuesta)=>{
        this.mensajesService.mostrarMensaje('Registro de la empresa: '+ respuesta.nomepresa + ' es Exitoso');
        this.formularioCrearEmpresa.reset();
        this.habilitarRegistroEmpresa=false;
        this.obtenerEmpresas();
    }, 
    (error)=>{
      this.mensajesService.mostrarMensaje('Error de Registro: '+ error);
    }
    );
  }

  editarEmpresa(id: number, empresa: ListarEmpresas){
    this.habilitarActualizaEmpresa=true;
    this.empresaTemporalparaActualizar=empresa;
    this.formActualizaEmpresa.patchValue({
      nomepresa: this.empresaTemporalparaActualizar.nomepresa,
      dirempresa: this.empresaTemporalparaActualizar.dirempresa, 
      ciudadempresa: this.empresaTemporalparaActualizar.ciudadempresa,
      paisempresa: this.empresaTemporalparaActualizar.paisempresa,
      
    })

    this.idActualizable=id;
  }

  actualizacionEmpresa(){
    const clienteActualizado =this.formActualizaEmpresa.value;
    this.empresaService.actualizarEmpresa(this.idActualizable, clienteActualizado).subscribe(
      (respuesta)=>{
        this.formActualizaEmpresa.reset();
        this.habilitarActualizaEmpresa=false;
        this.mensajesService.mostrarMensaje('La Empresa: '+ respuesta.nomepresa + ' ha sido actualizado con exito');
        this.obtenerEmpresas();
      },
      (error)=>{
        this.mensajesService.mostrarMensaje('Error Obtenido: '+ error);
      });
  }

  borradorEmpresa(idempresa: number){
    this.empresaService.borrarEmpresa(idempresa).subscribe(
      (respuesta)=>{
        this.mensajesService.mostrarMensaje('Empresa borrado con Éxito ');
        this.obtenerEmpresas();
      },
      (error)=>{
        this.mensajesService.mostrarMensaje('Error Obtenido: ' + error);
      });
  }

  habilitarAgregarEmpresa(){
    this.habilitarRegistroEmpresa=true;
  }
  cancelarAgregarEmpresa(){
    this.habilitarActualizaEmpresa=false
    this.habilitarRegistroEmpresa=false
  }
  



}
