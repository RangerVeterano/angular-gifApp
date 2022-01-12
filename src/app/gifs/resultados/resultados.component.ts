import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  //inyectamos nuestros servicios
  constructor(private gifService: GifsService) { }

  //Hacemos el get de los resultados de la peticion
  get resultados() {
    return this.gifService.resultados;
  }

}
