import { Component } from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  //Inyectamos nuestro servicio de gif
  constructor(private gifService: GifsService) { }

  //Creamos el getter para conseguir el historial completo
  get historial(): string[] {

    //Devolvemos nuestro arreglo completo de historial
    return this.gifService.historial
  }

  //Metodo para buscar gif nuevos desde el historial
  buscar(term: string) {

    //Llamamos a nuestro servicio para realizar la busqueda de gifs
    this.gifService.buscarGif(term);
  }

}
