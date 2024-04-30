import { Component, OnInit } from '@angular/core';
import { ListarProveedores } from '../modelos/proveedores.model';
import { ProveedoresService } from '../servicios/proveedores/proveedores.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../servicios/login/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {


  proveedores: ListarProveedores[] = [];
  proveedoresFiltrados: ListarProveedores[] = [];
  idempresa: number;


  constructor ( private loginService: LoginService, private router: Router, private listarProveedoresService: ProveedoresService){}

  ngOnInit(): void {
    this.cargarProveedores();

  }

  cargarProveedores(){
    this.listarProveedoresService.obtenerProveedores().subscribe(
      proveedores => {
        this.proveedores= proveedores;
      },
      error => {
        console.error('Error al obtener Proveedores', error);
      }

    );
    
  }

  mostrarDetalles(proveedor: any){

  }

  cerrarSession(){
    this.loginService.cerrarSession();
    this.router.navigate(['/inicio']);
  }

}
