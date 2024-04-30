import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from '../productos/productos.component';
import { ProductoService } from '../servicios/productos/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductosComponent],
  templateUrl: './buscador-productos.component.html',
  styleUrl: './buscador-productos.component.css'
})
export class BuscadorProductosComponent {
  terminoBusqueda = '';

  constructor(private router: Router, private productoService: ProductoService) { }

  buscarProductos(): void {
    const resultados = this.productoService.buscarProductos(this.terminoBusqueda);
    this.productoService.almacenarResultadosBusqueda(resultados);
    this.router.navigate(['/resultados-busqueda']);
  }
}