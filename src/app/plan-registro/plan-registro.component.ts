import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanRegistroService } from '../servicios/plan-regristro/plan-registro.service';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-registro',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './plan-registro.component.html',
  styleUrl: './plan-registro.component.css'
})
export class PlanRegistroComponent {

  constructor(
    private planRegistroService: PlanRegistroService
  ){}

  enviarPlan(valor: number): void {
    this.planRegistroService.enviarPlan(valor);

  }

}
