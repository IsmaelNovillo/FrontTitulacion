import { Component } from '@angular/core';
import { CartService } from '../servicios/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ventana-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink,],
  templateUrl: './ventana-carrito.component.html',
  styleUrl: './ventana-carrito.component.css'
})

export class VentanaFlotanteComponent {
tieneProductos() {
return true
}
  constructor(public cartService: CartService) {}


}


