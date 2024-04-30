import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../servicios/productos/productos.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { AgregarProducto } from '../modelos/productos.model';
import { CommonModule } from '@angular/common';
import { LoginService } from '../servicios/login/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registarar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registarar-producto.component.html',
  styleUrl: './registarar-producto.component.css'
})
export class RegistararProductoComponent implements OnInit {
// registro-producto.component.ts

agregarProductoForm: FormGroup;
mensaje: string;
usuarioRol: string = '';
usuarioEsEmpresa: boolean=false;

constructor(
  private formBuilder: FormBuilder,
  private productoService: ProductoService,
  private mensajesService: MensajesEmergentesService,
  private loginService: LoginService,

) {}
  ngOnInit(): void {
    this.iniciandoFormdeRegistro();
    this.LogicaBotonPerfilEmpresa();
  }

iniciandoFormdeRegistro(){
  this.agregarProductoForm = this.formBuilder.group({
    nomproducto: ['', [Validators.required]],
    precioproducto: [null, [Validators.required]],
    stockproducto: [null, [Validators.required]],
  });
}

GuardandoProducto(){
  const productoAgregado = this.agregarProductoForm.value as AgregarProducto;

  this.productoService.creadorProducto(productoAgregado).subscribe(
    (datoProducto)=>{
    console.log(datoProducto);
    this.agregarProductoForm.reset();
    this.mensaje='Producto agregado correctamente';
    this.mensajesService.mostrarMensaje(this.mensaje);

    },
    (error)=>{
      // Manejo errores de la solicitud
      console.error('Error al agregar Producto', error);
      if (error.status === 401) {
        this.mensajesService.mostrarMensaje('Error: Usuario no autorizado');
      } else if (error.status === 404) {
        this.mensajesService.mostrarMensaje('Error: Recurso no encontrado');
      } else {
        this.mensajesService.mostrarMensaje(
          'Error desconocido. Por favor, inténtalo de nuevo.'
        );
      }
    }
    );
}

botonAgregarProducto(){
  if(this.agregarProductoForm.valid){
    this.GuardandoProducto();
  }else{
    this.mensajesService.mostrarMensaje('Complete todos los campos del formulario');

  }

}

LogicaBotonPerfilEmpresa(){
  const rol = localStorage.getItem('rol');
    if (rol ==='ADMIN' || rol === 'EMPRENDEDOR') { 
      this.usuarioEsEmpresa = true;
    } else{
    }
  } 
}