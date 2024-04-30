import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroEmpresaService } from '../servicios/registro-empresa/registro-empresa.service';
import { MensajesEmergentesService } from '../servicios/mensajes/mensajes-emergentes.service';
import { Router } from '@angular/router';
import { PlanRegistroService } from '../servicios/plan-regristro/plan-registro.service';
import { LoginService } from '../servicios/login/login.service';
import { CrearEmpresa } from '../modelos/empresas.model';

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './registro-empresa.component.html',
  styleUrl: './registro-empresa.component.css'
})
export class RegistroEmpresaComponent implements OnInit {

  mensaje: string;
  registroEmpresaForm: FormGroup;
  valorPlan: number;
  identificador: number=5;

  constructor(
    private formBuilder: FormBuilder,
    private registroEmpresaService: RegistroEmpresaService, 
    private mensajesService: MensajesEmergentesService,
    private router: Router,
    private planServicio: PlanRegistroService,
    private loginService: LoginService,

  ) {
    this.registroEmpresaForm = this.formBuilder.group({
      nomepresa: ['', Validators.required],
      dirempresa: ['', Validators.required],
      ciudadempresa: ['', Validators.required],
      paisempresa: ['', Validators.required]
    });
  }
  ngOnInit(): void {
   // this.ObteniendoValorPlanEmpresa();
    
  }

  get empresa() {
    return this.registroEmpresaForm.value as CrearEmpresa;
  }

  GuardandoEmpresa() {
    this.registroEmpresaService.creandoEmpresa(this.empresa)
      .subscribe(
        data => {
          console.log(data);
          this.mensaje = 'Empresa Registrada Exitosamente, espere que su empresa sea validada por el administrador del sitio';
          this.limpiarFormulario();
          localStorage.setItem('rol', "EMPRENDEDOR");
          this.mensajesService.mostrarMensaje(this.mensaje);
          this.router.navigate(['/empresas']);
        },
        (error) => {
          if (error.status === 401) {
            this.mensajesService.mostrarMensaje('Error: Empresa no autorizada');
          } else if (error.status === 404) {
            this.mensajesService.mostrarMensaje('Error: Recurso no encontrado');
          } else {
            this.mensajesService.mostrarMensaje('Error desconocido. Por favor, inténtalo de nuevo.');
          }
        }
      );
  }

  limpiarFormulario() {
    this.registroEmpresaForm.reset();
  }

  // ObteniendoIdentificador(){
  //   this.loginService.obtenerIdentificador().subscribe(
  //     (dato)=>{
  //       this.identificador=dato

  //     });

  // }

  // ObteniendoValorPlanEmpresa(){
  // this.planServicio.obtenerPlan().subscribe(
  //   (dato)=>{
  //     this.valorPlan =dato;
  //   });
    
  // }
}
