import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';
import { MiEmpresaService } from '../servicios/registro-empresa/lista-empresas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrearEmpresa, ListarEmpresas, MiEmpresa } from '../modelos/empresas.model';
import { CrearProoveedorService } from '../servicios/proveedores/proveedores.service';
import { RegistroProveedor } from '../modelos/proveedores.model';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule,],
  templateUrl: './perfil-empresa.component.html',
  styleUrl: './perfil-empresa.component.css'
})
export class PerfilEmpresaComponent implements OnInit {


  usuarioRol: string = '';
  usuarioEsEmpresa: boolean = false;
  miEmpresa: MiEmpresa;
  registroProveedorForm: FormGroup;
  formActualizaEmpresa: FormGroup;
  empresaTemporalparaActualizar: CrearEmpresa; //utilizado para actualizar datos del clietnte
  idActualizable: number = 1;

  constructor(
    private loginService: LoginService,
    private miEmpresaService: MiEmpresaService,
    private formConstructor: FormBuilder,
    private proveedorService: CrearProoveedorService,
    private mensajesService: MensajesEmergentesService,
  ) {
    this.registroProveedorForm = this.formConstructor.group({
      idempresa: [null],
      nomproveedor: ['', Validators.required],
      telefproveedor: [null, Validators.required],
      correoproveedor: ['', Validators.required],
      direccionproveedor: ['', Validators.required],
      ciuproveedor: ['', Validators.required],
      paisproveedor: ['', Validators.required],

    });

  }

  ngOnInit(): void {
    this.LogicaBotonPerfilEmpresa();

    this.loginService.obtenerIdentificador().subscribe(
      (codigo) => {
        this.registroProveedorForm.get('idempresa')?.setValue(codigo)
        this.cargandoMiEmpresa();
      });

    this.iniciarFormActualizacion();



  }


  cargandoMiEmpresa() {
    this.miEmpresaService.obtenerEmpresa(this.idActualizable).subscribe(
      (datosEmpresa) => {
        this.miEmpresa = datosEmpresa;
        console.log('Datos de la empresa:', datosEmpresa);
      },
      (error) => {
        console.error('Error al obtener empresas:', error);
      }
    );
  }
  // Area del proveedor
  get proveedor() {
    return this.registroProveedorForm.value as RegistroProveedor;
  }

  respuestaPresentada: string;
  creandoProveedor() {
    this.proveedorService.CreandoProveedor(this.proveedor).subscribe(
      datos => {
        this.respuestaPresentada = ('Registro Exitoso de su proveedor: ' + datos.nomproveedor);
        this.mensajesService.mostrarMensaje(this.respuestaPresentada);
        this.limpiezaFormulario();
        this.registrarProveedor = false;
      },
      (error) => {
        if (error.status === 401) {
          this.mensajesService.mostrarMensaje('Error: Empresa no autorizada');
        } else if (error.status === 404) {
          this.mensajesService.mostrarMensaje('Error: Recurso no encontrado');
        } else {
          this.mensajesService.mostrarMensaje('Error desconocido. Por favor, inténtalo de nuevo.');
        }
      }
    )
  }
  //Actualizacion de mi empresa
  iniciarFormActualizacion() {
    this.formActualizaEmpresa = this.formConstructor.group({
      nomepresa: ['', Validators.required],
      dirempresa: ['', Validators.required],
      ciudadempresa: ['', Validators.required],
      paisempresa: ['', Validators.required],
    });
  }

  // editarEmpresa(id: number, empresa: ListarEmpresas) {
  //   this.empresaTemporalparaActualizar = empresa;
  //   this.formActualizaEmpresa.patchValue({
  //     nomepresa: this.empresaTemporalparaActualizar.nomepresa,
  //     dirempresa: this.empresaTemporalparaActualizar.dirempresa,
  //     ciudadempresa: this.empresaTemporalparaActualizar.ciudadempresa,
  //     paisempresa: this.empresaTemporalparaActualizar.paisempresa,

  //   })

  //   this.idActualizable = id;
  // }

  actualizacionEmpresa() {
    const clienteActualizado = this.formActualizaEmpresa.value;
    this.miEmpresaService.actualizarEmpresa(this.idActualizable, clienteActualizado).subscribe(
      (respuesta) => {
        this.formActualizaEmpresa.reset();
        this.mensajesService.mostrarMensaje('La Empresa: ' + respuesta.nomepresa + ' ha sido actualizado con exito');
        this.cargandoMiEmpresa();
      },
      (error) => {
        this.mensajesService.mostrarMensaje('Error Obtenido: ' + error);
      });
  }




  limpiezaFormulario() {
    this.registroProveedorForm.reset();
  }


  habilitarEdicion() {
    throw new Error('Method not implemented.');
  }
  mostrarContrasena() {
    throw new Error('Method not implemented.');
  }
  verPassword: any;


  registrarProveedor: boolean = false;
  PreparandoRegistroProveedor(): void {
    this.registrarProveedor = true;

  }
  CancelarAccion(): void {
    this.registrarProveedor = false

  }


  LogicaBotonPerfilEmpresa(){
    const rol = localStorage.getItem('rol');
      if (rol ==='ADMIN' || rol === 'EMPRENDEDOR') { 
        this.usuarioEsEmpresa = true;
      } else{
      }
    }
  



}
