import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent,
    ResultadosComponent
  ],
  exports: [
    //Solo exportamos este componente porque el resto de los 
    //componente se van a contemplar dentro de este componente
    GifsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
