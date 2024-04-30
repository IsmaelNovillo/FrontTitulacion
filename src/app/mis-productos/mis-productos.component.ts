import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../servicios/productos/productos.service';
import { TodosLosProductos } from '../modelos/productos.model';
import { CommonModule } from '@angular/common';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { LoginService } from '../servicios/login/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './mis-productos.component.html',
  styleUrl: './mis-productos.component.css'
})
export class MisProductosComponent implements OnInit{

  actualizadorProductoForm: FormGroup;
  usuarioRol: string = '';
  usuarioEsEmpresa: boolean = false;
  misProductos: TodosLosProductos[]=[];
  activarActualizacion: boolean = false;
  

  constructor(
    private productosService: ProductoService,
    private mensajesService: MensajesEmergentesService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,

  ){}
  ngOnInit(): void {
    this.mostrandoMisProductos();
    
    this.loginService.obtenerRol().subscribe(
      (rol)=>{
        this.usuarioRol=rol;
      });

      this.LogicaBotonPerfilEmpresa();

    this.actualizadorProductoForm = this.formBuilder.group({
      nomproducto: [''],
      precioproducto: [''],
      stockproducto: ['']
    });
  }

  mostrandoMisProductos(){
    this.productosService.listandoProductos().subscribe(
      (productoObtenido)=>{
        this.misProductos=productoObtenido;
      }
    );
  }

  
  temporalProduc: TodosLosProductos;

  editarProducto(identProduc: number , miProducto: TodosLosProductos): void{
    this.activarActualizacion = true;
    this.temporalProduc = miProducto;
    this.productosService.enviarIdentificador(identProduc);
    // Llena el formulario con los datos del producto seleccionado para editar
    this.actualizadorProductoForm.patchValue({
      nomproducto: this.temporalProduc.nomproducto,
      precioproducto: this.temporalProduc.precioproducto,
      stockproducto: this.temporalProduc.stockproducto
    });


    
  }

  guardandoActualizacionProducto():void{

    const productoActualizado = this.actualizadorProductoForm.value;
    
    this.productosService.actualizarProductos(productoActualizado).subscribe(
      (productoActualizado) => {
        // Manejas la respuesta si la actualización fue exitosa
        this.mensajesService.mostrarMensaje('Producto actualizado:');
        // Restableces el formulario y los datos temporales
        this.activarActualizacion = false;
        //this.temporalProduc = undefined;
        this.actualizadorProductoForm.reset();
      },
      (error) => {
        // Manejas el error si la actualización falló
        this.mensajesService.mostrarMensaje('Error al actualizar el producto: ' + error);
      });

    this.activarActualizacion = false;
    //this.temporalProduc=null;
    this.actualizadorProductoForm.reset();
  }
  borrarProducto(idaBorrar: number){
    this.productosService.borrarProducto(idaBorrar).subscribe(
      (borrado)=>{
        this.mensajesService.mostrarMensaje('Producto Borrado',);
      }  
    );
    this.mostrandoMisProductos();
  }

  cancelarEdicionProducto(){

    this.activarActualizacion = false;
    //this.temporalProduc = null;
    this.actualizadorProductoForm.reset();
  }

  //Este metodo activa los botones del panel para empresas
  LogicaBotonPerfilEmpresa(){
    const rol = localStorage.getItem('rol');
      if (rol ==='ADMIN' || rol === 'EMPRENDEDOR') { 
        this.usuarioEsEmpresa = true;
      } else{
      }
    }


}
