import { CommonModule } from '@angular/common';
import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { SistemaServicio } from '../servicios/app/sistema.service';

@Component({
  selector: 'app-categorias-flotantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categorias-flotantes.component.html',
  styleUrl: './categorias-flotantes.component.css'
})
export class CategoriasFlotantesComponent implements OnInit{
  @ViewChild('botonMenu') botonMenu: ElementRef | undefined;
  @ViewChild('flotanteContenido') flotanteContenido: ElementRef | undefined;

  categorias = ['Hoteles', 'Turismo', 'Tecnologia','Agricultura', 'Gastronomia'];

  estadoActualLogin: boolean;


  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private mensajesService: MensajesEmergentesService,
    private sistemServicio: SistemaServicio,
    ){}

  ngOnInit(): void {
    this.obteniendoEstadoLogin(); 
    this.estadoActualLogin=this.loginService.haIniciadoSesionUsuario();
  }

  SeleccionCategoria(categoria: string) {
    console.log(`Filtrando por la categoría: ${categoria}`);
    // Aquí puedes agregar la lógica para filtrar por la categoría seleccionada
  }

  menuAbierto: boolean = false;
  estadoMenu() {
    if (this.flotanteContenido && this.botonMenu) {
      this.menuAbierto = !this.menuAbierto;
      this.flotanteContenido.nativeElement.style.display = this.menuAbierto ? 'block' : 'none';
    }
  }

  obteniendoEstadoLogin(): void{
    this.loginService.obtenerEstadoLogin().subscribe(
      (estatus)=>{
        this.estadoActualLogin=estatus;
      }
    )
  }

  condicionDeBoton(): void{
    if(this.estadoActualLogin===true){
      this.router.navigate(['/seguridad/plan-registro']);
    }else{
      this.mensajesService.mostrarMensaje('Primero debes inicar Sesion o Registrarte');
      this.router.navigate(['/seguridad/login-user'])
    }


  }

  mostrarChat(){
    this.sistemServicio.enviarActivacionChat(true);
  }


}
