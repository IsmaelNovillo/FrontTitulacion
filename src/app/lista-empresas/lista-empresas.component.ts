import { Component, OnInit } from '@angular/core';
import { ListaEmpresasService } from '../servicios/registro-empresa/lista-empresas.service';
import { ListarEmpresas } from '../modelos/empresas.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-empresas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-empresas.component.html',
  styleUrl: './lista-empresas.component.css'
})
export class ListaEmpresasComponent implements OnInit {

  
  empresas: ListarEmpresas[] = [];

  constructor(private listaEmpresas: ListaEmpresasService,) { }

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.listaEmpresas.obtenerEmpresas().subscribe(
      
      empresas => {
        this.empresas = empresas;
      },
      error => {
        console.error('Error al obtener empresas:', error);
      }
    );
  }

  mostrarDetalles(proveedor: any) {
    
    
    }
}