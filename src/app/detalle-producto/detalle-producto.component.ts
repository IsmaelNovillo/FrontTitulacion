import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../modelos/productos.model';
import { CartService } from '../servicios/carrito/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent {
  @Input() producto: Producto;

  constructor(
    private cartService: CartService,
    
    
    ){}


  addToCart(producto: Producto): void {
    // Agregar la cantidad especificada al carrito
    this.cartService.addItemToCart(producto, producto.cantidadAgregar || 1);
    
    // Reiniciar la cantidad a agregar después de agregar al carrito
    producto.cantidadAgregar = 1;
  }

}
