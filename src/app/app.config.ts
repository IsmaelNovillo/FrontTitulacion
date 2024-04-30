import { NgModule } from '@angular/core';
import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgSwitch } from '@angular/common';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';



NgModule({
  declarations:[
    

  ],

  imports:[
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgSwitch,
    FormsModule,
    FormGroup,
    RouterLink,
    ReactiveFormsModule,
    
    
    

  ],
  providers:[ provideHttpClient(),
    

  ],


})


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes)]
};
