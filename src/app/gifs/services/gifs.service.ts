import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];//Arreglo de todos los strings del historial
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'kBTw10XFyKgf8XnCTXsiVsPTQ7HRGHa0'; //Clave API para giphy

  //Nuestro arreglo de resultado es un arreglo de variables de tipo Gif
  public resultados: Gif[] = [];

  get historial(): string[] {

    //Con esto rompemos la referecia y nos evitamos problemas en e futuro
    return [...this._historial]
  }

  //inyectamos nuestro servicio para las peticiones http
  constructor(private http: HttpClient) {

    //Comprobamos que nuesta clave se encuentra en el local storage
    if (localStorage.getItem('historial')) {
      //Guardamos la variable del localstorage en nuestro programa
      //le indicamos con ! que sabemos lo que hacemos
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    //Otra forma es la siguiente
    //Cargamos nuestros ultimos resultados
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  /**
   * 
   * @param query 
   */
  buscarGif(query: string) {

    //includes es una funcion de arreglos que nos permite saber si 
    //un valor está incluido dentro del arreglo

    //Cortamos los espacios vacios y lo pasamos todo a mayusculas 
    query = query.trim().toLocaleUpperCase();

    //En este caso si no está incluido se inserta
    if (!this._historial.includes(query)) {
      //Insteramos la busqueda dentro de nuestro arreglo de strings
      this._historial.unshift(query);

      //Cortamos solo los 10 primeros elementos del arreglo
      this._historial = this._historial.splice(0, 10)

      //Guardamos nuestras consultas dentro del localstorage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //Preparamos nuestros paramámetros para la peticion http
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    //Hacemos la peticion get de nuestros gifs
    //El subscribe se ejecuta cuando tengamos la respuesta de la peticion, lo que se devuelve es un observable
    //Colocamos el tipo de varaiable al principio porqué es de tipo genérico

    //colocamnos nuestra url y luego los parámetros de la petcion http
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params} )
      .subscribe((response) => {
        //Nos guardamos nuestra data 
        this.resultados = response.data

        //Guardamos nuestro resultados dentro del localstorage
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })



    /*
      fetch('https://api.giphy.com/v1/gifs/search?api_key=kBTw10XFyKgf8XnCTXsiVsPTQ7HRGHa0&q=dbz&limit=10')
        .then(resp => {
          resp.json()
            .then(data => console.log(data))
         })
  */
  }

}


/*

Podemos decir que ahora va a ser un metodo asincrono
async buscarGif(query: string) {

    if (!this._historial.includes(query.trim().toLocaleLowerCase())) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)
    }

    Podemos guardar la respuesta dentro de una constante
    const reps = await fetch('https://api.giphy.com/v1/gifs/search?api_key=kBTw10XFyKgf8XnCTXsiVsPTQ7HRGHa0&q=dbz&limit=10')

    Para luego poder transformar esa respuesta en un json
    const data = await resp.json()

    Y ahora si ya acceder a la data de la peticion
    console.log(data);

}

*/