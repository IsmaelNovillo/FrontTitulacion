import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MensajesEmergentesService } from '../../servicios/mensajes/mensajes-emergentes.service';
import { PlanRegistroService } from '../../servicios/plan-regristro/plan-registro.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActualizarPlanRegistro, CrearPlanRegistro, ListarPlanRegistro } from '../../modelos/plan.model';

@Component({
  selector: 'app-admin-planes',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-planes.component.html',
  styleUrl: './admin-planes.component.css'
})
export class AdminPlanesComponent implements OnInit {

  habilitarRegistroPlan: boolean = false;
  habilitarActualizaPlan: boolean = false;
  todosPlan: ListarPlanRegistro[] = [];
  nuevoPlan: CrearPlanRegistro;
  formularioCrearPlan: FormGroup;
  formActualizaPlan: FormGroup;
  PlanTemporalparaActualizar: CrearPlanRegistro; //utilizado para actualizar datos del clietnte
  idActualizable: number;

  //constructor y metodo para enviar el dato desde este componente hasta el componente registro 

  constructor(
    private planRegistroService: PlanRegistroService,
    private mensajesService: MensajesEmergentesService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.obtenerPlanes();
    this.iniciarFormularioCrear();
    this.iniciarFormActualizacion();

  }

  iniciarFormularioCrear() {
    this.formularioCrearPlan = this.formBuilder.group({
      descripccion: ['', Validators.required],
      nomplan: ['', Validators.required],
      costo: [null, Validators.required],
      requisitosplan: ['', Validators.required],
    });
  }
  iniciarFormActualizacion() {
    this.formActualizaPlan = this.formBuilder.group({
      descripccion: ['', Validators.required],
      nomplan: ['', Validators.required],
      costo: [null, Validators.required],
      requisitosplan: ['', Validators.required],
    });
  }

  obtenerPlanes() {
    this.planRegistroService.ObtenerPlanes().subscribe(
      (planesTotal) => {
        this.todosPlan = planesTotal
      }
    )
  }

  creadorPlan() {
    const planAgg = this.formularioCrearPlan.value as CrearPlanRegistro;

    this.planRegistroService.crearPlan(planAgg).subscribe(
      (respuesta) => {
        this.mensajesService.mostrarMensaje('Registro del plan: ' + respuesta.nomplan + ' es Exitoso');
        this.formularioCrearPlan.reset();
        this.habilitarRegistroPlan = false;
        this.obtenerPlanes();
      },
      (error) => {
        this.mensajesService.mostrarMensaje('Error de Registro: ' + error);
      }
    );
  }


  editarPlan(id: number, plan: ActualizarPlanRegistro) {
    this.habilitarActualizaPlan = true;
    this.PlanTemporalparaActualizar = plan;
    this.formActualizaPlan.patchValue({
      descripccion: this.PlanTemporalparaActualizar.descripccion,
      nomplan: this.PlanTemporalparaActualizar.nomplan,
      costo: this.PlanTemporalparaActualizar.costo,
      requisitosplan: this.PlanTemporalparaActualizar.requisitosplan,

    })

    this.idActualizable = id;
  }

  actualizacionCliente() {
    const planActualizado = this.formActualizaPlan.value;
    this.planRegistroService.actualizarPlan(this.idActualizable, planActualizado).subscribe(
      (respuesta) => {
        this.formActualizaPlan.reset();
        this.habilitarActualizaPlan = false;
        this.mensajesService.mostrarMensaje('El Plan ' + respuesta.nomplan + ' ha sido actualizado con exito');
        this.obtenerPlanes();
      },
      (error) => {
        this.mensajesService.mostrarMensaje('Error Obtenido: ' + error);
      });
  }

  borradorPlan(idPlan: number) {
    this.planRegistroService.borrarPlan(idPlan).subscribe(
      (respuesta) => {
        this.mensajesService.mostrarMensaje('Plan borrado con Éxito ');
        this.obtenerPlanes();
      },
      (error) => {
        this.mensajesService.mostrarMensaje('Error Obtenido: ' + error);
      });
  }
  habilitarAgregarPlan() {
    this.habilitarRegistroPlan = true;
  }
  cancelarAgregarPlan() {
    this.habilitarActualizaPlan = false
    this.habilitarRegistroPlan = false
  }







}
