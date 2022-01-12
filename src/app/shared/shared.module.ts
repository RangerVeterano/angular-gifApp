import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  declarations: [
    SidebarComponent
  ],
  //Lo tenemos que exportar para poder hacer que se vea desde fuera del modulo
  //Mas concretamente en la parte de app
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
