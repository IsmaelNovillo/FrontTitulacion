import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../modelos/productos.model';
import { CartService } from '../servicios/carrito/carrito.service';
import { ProductoService } from '../servicios/productos/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VentanaFlotanteComponent } from "../ventana-carrito/ventana-carrito.component";
import { DetalleProductoFlotanteComponent } from "../detalle-producto-flotante/detalle-producto-flotante.component";
import { LoginService } from '../servicios/login/login.service';
import { DetalleProductoService } from '../servicios/detalle-producto/detalle-producto.service';

@Component({
    selector: 'app-resultados-busqueda',
    standalone: true,
    templateUrl: './resultados-busqueda.component.html',
    styleUrl: './resultados-busqueda.component.css',
    imports: [CommonModule, FormsModule, VentanaFlotanteComponent, RouterLink, DetalleProductoFlotanteComponent]
})
export class ResultadosBusquedaComponent {
  resultados$: Producto[];
 

  constructor(
    private productoService: ProductoService, 
    private route: ActivatedRoute, 
    private cartService: CartService, 
    private detalleProductoService: DetalleProductoService,
    private loginService: LoginService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoService.obtenerResultadosBusqueda().subscribe(resultados => {
        this.resultados$ = resultados;
      });
    });
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
cerrarSession(){
  this.loginService.cerrarSession();
  this.router.navigate(['/inicio']);
}


}


