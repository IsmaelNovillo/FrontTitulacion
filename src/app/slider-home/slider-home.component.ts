import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.css'
})
export class SliderHomeComponent {
   //Creando Slaider de Imagenes con Opcion de Adenlantar o Retroseder Imagen 

   @Input() imagen: { src: string; route: string; }[] = [];
   
   carruselImagenIndicador  = 0;

   ngOnInit() {
    setInterval(() => {
      this.siguienteImagen();
    }, 10000); // Cambia la imagen cada 2 segundos
  }
 
   siguienteImagen(){
    if (this.imagen.length > 0) {
      this.carruselImagenIndicador = (this.carruselImagenIndicador + 1) % this.imagen.length;
    }   }
 
   anteriorImagen(){
    if (this.imagen.length > 0) {
      this.carruselImagenIndicador = (this.carruselImagenIndicador - 1 + this.imagen.length) % this.imagen.length;   }
   }

   imgenActual(index: number) {
    return index === this.carruselImagenIndicador;
  }
}
