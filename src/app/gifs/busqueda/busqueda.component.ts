import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Con el @ViewChild podemos buscar un elemento hijo del html
  // Devuelve un elemento de tipo ElementRef

  // El elemento que buscamos puede ser que no se encuente por eso 
  //empleamos el ! para decir a TSscript de que si que va a existir

  //Le especificamos al elemento que es de tipo input del html, para tener
  //acceso a las ayudas que ofrece typeScript
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //inyectamos nuestro servicio de gifs, siempre en el constructor
  constructor(private gifService: GifsService) { }

  //Metodo para buscar gifs en nuestro programa
  buscar() {

    //Guardamos el valor de nuestra busqueda
    // constante porque no va a cambiar 
    const valor = this.txtBuscar.nativeElement.value;

    //Cortamos todos los espacios, en el caso de que el length sea 0 no se hace nada
    if (valor.trim().length === 0) {
      return;
    }
    this.gifService.buscarGif(valor)
    this.txtBuscar.nativeElement.value = ''; //vaciamos la variable

  }

}
