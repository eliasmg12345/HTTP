import { Injectable } from '@angular/core';
//A3-
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {


  //A7 creamos baseUrl:string; porque se repite mucho
  baseUrl:string;

  /*A4 para poder utilizarla hayu que inyectarla 
  esto lo que me permite es que dentro de cualquiera de los metodos de este servicio PostsService
    yo pueda usar esta herramienta HttpClient para hacer peticiones */
  constructor(private httpClient:HttpClient) {
    //A7
    this.baseUrl='https://jsonplaceholder.typicode.com/posts';
   }

  /*A5 por ejemplo si en la definicion ['https://jsonplaceholder.typicode.com/posts'] nos dicen
  que para recuperar todos los posts tengo que hacer una peticion GEt sobre esta url pues lo 
  que tendre que hacer es crearme un metodo por ejemplo getAll() */


  
    //A6 para hacer esta peticion lo unico que vamos a hcer es llamar a httClient quien ya tiene
    //todos lo metodos disponibles  en este caso el .get lo que recibe el metodo get() como primer
    //parametro es la url ejemplo ('https://jsonplaceholder.typicode.com/posts')

    /*A8 como get es observable ...va a ser mas comodo trabajr con promesas...entonces a esto lo
    transformamos en promesa .promise...asi ya todo esto me devuelve una promesa...y lo que voy
    a hacer es retornar la promesa para que esta sea consumida de fuera del punto donde nosotros
    vayamos a recuperar esta informacion....
    A9 PARA ESpecificar mas este metodo y darle los tipos podemos decirle que devuelve una promesa 
    y entre <> tenemos que decirle sobre que resuelve esa promesa ...es decir que nos va a devolver
    esta peticion this.basUrl ....si vamos al sitio del link vemos que es un array de objetos
    indefinidos any[]_______en fin ahora puedo consumirlo en el punto que yo quiera => app.comp.ts B1*/
    getAll():Promise<any[]>{
      return this.httpClient.get<any[]>(this.baseUrl).toPromise();
    }

    /* C2   le pasaremos el pId de tipo number para usarlo desde cualquuier otro componente  
    -....de primeras se que me devuelve una promesa asi sera siempre para los HTTP ...
    se podria gestionar con observables si le quitaramos el .toPromise
    __ahjora como nos devuelve un unico objeto es any sin corchetes 
    __le sigo al get que va resolver tipo <any> y lo unico que le tengo que pasar es la url pero 
    acompañada del parametro que le estamos pasando ...para concatenar utilizaremos un template Literal ``
    __lo tranformamos a promesa .toPromise() 
    __aremos cliclable al div del html => app.html C3*/
    getById(pId:number):Promise<any>{
      return this.httpClient.get<any>(`${this.baseUrl}/${pId}`).toPromise();
    }

    /*D2 vfamos a pasar los datos podemos aprovechar que los datos que le van a llegar es un objeto con 
    las claves title body y userId
    ___para tenerlo mas comodo voy a crear un objeto que se llame bodyRequest    el cual va recoger...y
    la voy a crear con el {} titile body userIdque nos viene por parametro
    ___vamos a hacer la peticion post  ...volvemos a lo mismo de antes igual que la peticion Get pero .post 
     tenemos que pasarle () primero la url ,,,,y segundo al post si o si tenemos que pasarle un objeto en 
     nuestro caso lo hemos preparado y se llama bodyRequest...luego simplemente llamamos al metodo .toPromise
     ________dentro del html pondremos un boton para hacer ese tipo de peticion =>html D3*/
    create({title,body,userId}):Promise<any>{
      const bodyRequest={title,body,userId}
      return this.httpClient.post<any>(this.baseUrl,bodyRequest).toPromise();

    }
}
