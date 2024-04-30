import { Component } from '@angular/core';
import { CreadorImagenes, ListadorImagenes } from '../../modelos/imagenes.model';
import { ImagenesService } from '../../servicios/imagenes/imagenes.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MensajesEmergentesService } from '../../servicios/mensajes/mensajes-emergentes.service';

@Component({
  selector: 'app-imagenes-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './imagenes-control.component.html',
  styleUrl: './imagenes-control.component.css'
})
export class ImagenesControlComponent {


  habilitarRegImg: boolean = false;
  Imagenes: ListadorImagenes[]=[];
  nuevaImagen: CreadorImagenes;
  formularioImagen: FormGroup;
  formularioActualizaImagen: FormGroup;

  constructor(
    private imagenesService: ImagenesService,
    private formBuilder: FormBuilder,
    private mensajesService: MensajesEmergentesService


  ){}

  ngOnInit() {
    this.obtenerImagenes();

    //Inicializacion el Formulario 
    this.inicializaFormularioCreador();
    this.iniciaFormActualizador();
  }

  iniciaFormActualizador(){
    this.formularioActualizaImagen = this.formBuilder.group({
      nombreimagen: ['', Validators.required],
      idimagen: ['', Validators.required],
    })
  }

  inicializaFormularioCreador(){
    this.formularioImagen = this.formBuilder.group({
      nombreimagen: ['',Validators.required],
      idimagen: ['', Validators.required],
    });
  }

  obtenerImagenes() {
    this.imagenesService.ObtenerImagenes().subscribe
      (img => {
      this.Imagenes = img;
    });
  }

  creadorImagen() {
    const imagenAgregada = this.formularioImagen.value as CreadorImagenes;

    this.imagenesService.crearImagen(imagenAgregada).subscribe(response => {
      this.mensajesService.mostrarMensaje('Imagen Agregada'+ response.nombreimagen);
      this.formularioImagen.reset();
      this.obtenerImagenes(); // Actualizar la lista después de crear
      this.habilitarRegImg=false
    },error=>{
      this.mensajesService.mostrarMensaje('Error' + error);
    }
    
    );
  }
//Metodos de Actualizacion

  plantillaActualizar: boolean =false;
  imagenTemporal: CreadorImagenes;
  editarImg(id: string, imagen: ListadorImagenes){
    this.plantillaActualizar=true;
    this.imagenTemporal=imagen;
    this.formularioActualizaImagen.patchValue({
      nombreimagen: this.imagenTemporal.nombreimagen,
      idimangen: this.imagenTemporal.idimagen
    });
    this.idhaActualizarse = id;

  }

  idhaActualizarse: string;

  actualizacionImagen() {
    const imagenAcutalizada = this.formularioActualizaImagen.value;
    this.imagenesService.actualizarImagen(this.idhaActualizarse, imagenAcutalizada).subscribe(response => {
      console.log(response);
      this.obtenerImagenes(); // Actualizar la lista después de actualizar
      this.formularioActualizaImagen.reset();
      this.plantillaActualizar = false;
      this.mensajesService.mostrarMensaje('Actualizacion Exitosa de: ' + response.nombreimagen);
    }, 
    (error)=>{
      this.mensajesService.mostrarMensaje('Error Obtenido: '+ error);
    }
    );
    
  }

  borradorImagen(id: string) {
    this.imagenesService.borrarImagen(id).subscribe(response => {
      console.log(response);
      this.obtenerImagenes(); // Actualizar la lista después de eliminar
    });
  }

  habilitarAgregar() {
    this.habilitarRegImg=true;
  }
  cancelarAgregar(){
    this.habilitarRegImg=false;
    this.plantillaActualizar=false;
  }
  
}

