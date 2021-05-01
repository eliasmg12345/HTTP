import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //B3 para visualizar ..luego 
  arrPosts:any[];

  /*B1 el primer paso para consumir el servicio es inyectarlo */
  constructor(private postsService:PostsService){

  }

  /* B2 en el ngOnInit cuando yo arranque este componente ...puedo hacer la carga de estos datos
  ....Como esto nos devuelve podemos gestionarla .then y .catch*/
  ngOnInit(){
    this.postsService.getAll()
    .then(posts=>this.arrPosts=posts)
    .catch(error=>console.log(error));
  }
  async onClick(postId){
      /*
      C4 lo que aremos es lanzar la peticion contra el metodo del servicio  y recuperar
      su informacion y lo aremos con then catch ooo asyn await...ya que nos vevuelve una promesa 
      lo aremos con async await...y para capturar errores se usa el bloque try catch
       */
      try{
        const post= await this.postsService.getById(postId);
        console.log(post);
      }catch(error){
        console.log(error);
      }
  }

  //D4 SIMPLEMENMTE LLAMAMos al metodo que generamos....esto me devuelve una promesa por la tanto 
  //me engancho con then catch ...lo importante de post es que le podemos pasar estos datos internamente
  onClickPost() {
    this.postsService.create({
      title:'nuevo titulo',
      body:'este es el cuerpo',
      userId:1
    }).then(response=>console.log(response))
      .catch(error=>console.log(error));
  }
}
