import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producto, TodosLosProductos } from '../modelos/productos.model';
import { CartService } from '../servicios/carrito/carrito.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoService } from '../servicios/productos/productos.service';
import { DetalleProductoFlotanteComponent } from '../detalle-producto-flotante/detalle-producto-flotante.component';
import { VentanaFlotanteComponent } from "../ventana-carrito/ventana-carrito.component";
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { DetalleProductoService } from '../servicios/detalle-producto/detalle-producto.service';


@Component({
    selector: 'app-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.css',
    imports: [CommonModule, FormsModule, VentanaFlotanteComponent, DetalleProductoFlotanteComponent]
})
export class ProductosComponent implements OnInit {

  constructor(
    private cartService: CartService, 
    private productoService: ProductoService, 
    private detalleProductoService: DetalleProductoService,
    private mensajesService: MensajesEmergentesService, 
    private cdr: ChangeDetectorRef
    ) {
    
  }
  
  productos$: Observable<Producto[]> = this.productoService.productos$;
  resultadosBusqueda$: Observable<Producto[]>;

  productosTotal: TodosLosProductos[]=[];



  ngOnInit(): void {
    this.productoService.refreshNeeded$.subscribe(() => {
      this.productos$ = this.productoService.productos$;
  });

  this.mostrarTodoLosProductos();
  }

  mostrarTodoLosProductos(): void{
    this.cdr.detectChanges();
      this.productoService.listandoProductos().subscribe(
        (produtosActuales)=>{
          console.log(produtosActuales);
          this.productosTotal=produtosActuales;
          
        },
        (error) => {
          console.error('Error:', error);
         // this.mensajesService.mostrarMensaje('La plataforma esta en modo DEMOSTRACION');
        }
      );
  }

  
  agregarAlCarrito(productos: TodosLosProductos): void {
    this.cartService.AggElementoAlCarrito(productos, productos.cantidadAgregar || 1);

    productos.cantidadAgregar= 1;
  }
  abrirDetalleProducto(productos: TodosLosProductos): void {
    this.detalleProductoService.mostrarDetalleProducto(productos);
  

}
 
  addToCart(producto: Producto): void {
    // Agregar la cantidad especificada al carrito
    this.cartService.addItemToCart(producto, producto.cantidadAgregar || 1);
    
    // Reiniciar la cantidad a agregar después de agregar al carrito
    producto.cantidadAgregar = 1;
  }


  abrirDetalle(producto: Producto): void {
    this.detalleProductoService.mostrarDetalle(producto);
  

}



}
