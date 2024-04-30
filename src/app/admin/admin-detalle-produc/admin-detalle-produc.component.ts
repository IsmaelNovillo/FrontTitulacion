import { Component } from '@angular/core';
import { CrearDetalleProdcuto, ListarDetalleProducto } from '../../modelos/productos.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensajesEmergentesService } from '../../servicios/mensajes/mensajes-emergentes.service';
import { DetalleProducto } from '../../servicios/productos/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-detalle-produc',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-detalle-produc.component.html',
  styleUrl: './admin-detalle-produc.component.css'
})
export class AdminDetalleProducComponent {
  habilitarRegistroDetalleProduc: boolean = false;
  habilitarActualizaDetalleProduc: boolean =false;
  todosLosDetallesProduc: ListarDetalleProducto[]= []; 
  nuevoDetalleProduc: CrearDetalleProdcuto;
  formularioCrearDetalleProduc: FormGroup;
  formActualizaDetalleProduc: FormGroup;
  detalleProducTemporalparaActualizar: CrearDetalleProdcuto; //utilizado para actualizar datos del clietnte
  idActualizable: number;

  constructor (
    private detalleProducto: DetalleProducto,
    private formBuilder: FormBuilder,
    private mensajesService: MensajesEmergentesService,

  ){}

  ngOnInit(){
    this.obtenerDetallesProductos();
    this.iniciarFormActualizacion();
    this.iniciarFormularioCrear();

  }

  iniciarFormularioCrear(){
    this.formularioCrearDetalleProduc = this.formBuilder.group({
      descripcion: ['', Validators.required],
      disponibilidad: [null, Validators.required],
      
    });
  }

  iniciarFormActualizacion(){
    this.formActualizaDetalleProduc = this.formBuilder.group({
      descripcion: ['', Validators.required],
      disponibilidad: [null, Validators.required],
    });
  }

  obtenerDetallesProductos(){
    this.detalleProducto.obtenerDetalleProductos().subscribe(
      (detallesTotales)=>{
        this.todosLosDetallesProduc=detallesTotales
      }
    )
  }

  creadorDetalleProducto(){
    const detalleproducAgg= this.formularioCrearDetalleProduc.value as CrearDetalleProdcuto;

    this.detalleProducto.crearDetalleProducto(detalleproducAgg).subscribe(
      (respuesta)=>{
        this.mensajesService.mostrarMensaje('Registro del Detalle del producto es Exitoso');
        this.formularioCrearDetalleProduc.reset();
        this.habilitarRegistroDetalleProduc=false;
        this.obtenerDetallesProductos();
    }, 
    (error)=>{
      this.mensajesService.mostrarMensaje('Error de Registro: '+ error);
    }
    );
  }

  editarDetalleProducto(id: number, cliente: ListarDetalleProducto){
    this.habilitarActualizaDetalleProduc=true;
    this.detalleProducTemporalparaActualizar=cliente;
    this.formActualizaDetalleProduc.patchValue({
      descripcion: this.detalleProducTemporalparaActualizar.descripcion,
      disponibilidad: this.detalleProducTemporalparaActualizar.disponibilidad,
      
    })

    this.idActualizable=id;
  }

  actualizacionDetalleProducto(){
    const detalleProducActualizado =this.formActualizaDetalleProduc.value;
    this.detalleProducto.actualizarDetalleProducto(this.idActualizable, detalleProducActualizado).subscribe(
      (respuesta)=>{
        this.formActualizaDetalleProduc.reset();
        this.habilitarActualizaDetalleProduc=false;
        this.mensajesService.mostrarMensaje('El Detalle del producto ha sido actualizado con exito');
        this.obtenerDetallesProductos();
      },
      (error)=>{
        this.mensajesService.mostrarMensaje('Error Obtenido: '+ error);
      });
  }

  borradorDetalleProducto(id: number){
    this.detalleProducto.borrarDetalleProducto(id).subscribe(
      (respuesta)=>{
        this.mensajesService.mostrarMensaje('Detalle del Producto borrado con Éxito ');
        this.obtenerDetallesProductos();
      },
      (error)=>{
        this.mensajesService.mostrarMensaje('Error Obtenido: ' + error);
      });
  }

  habilitarAgregarDetalleProducto(){
    this.habilitarRegistroDetalleProduc=true;
  }
  cancelarAgregarDetalleProducto(){
    this.habilitarActualizaDetalleProduc=false
    this.habilitarRegistroDetalleProduc=false
  }
  


}


