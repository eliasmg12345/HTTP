import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //B3 para visualizar ..luego 
  arrPosts:any[];
  //E2
  formulario:FormGroup;

  /*B1 el primer paso para consumir el servicio es inyectarlo */
  constructor(private postsService:PostsService){

    //E3
    this.formulario=new FormGroup({
      title:new FormControl(''),
      body:new FormControl(''),
      userId:new FormControl('')
    });
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
  //E5
  async onSubmit(){
    try{
      const reponse=await this.postsService.create(this.formulario.value); 
      console.log(reponse);
    }catch(error){
      console.log(error);
    }
  }

  /*F4 CFREANDO el metodo ...no olvidar que todo el cuerpor es una promesa*/
  onClickUpdate(){
    this.postsService.update({
      id:5,
      title:'Nuevo titulo',
      body:'nuevo cuerpo para el post',
      userId:3
    }).then(response=>console.log(response))
      .catch(error=>console.log(error));
  }

  /*G4 con asyn await jaaja*/
  async onClickDelete(){
    try{
      const response= await this.postsService.delete(5);
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }
}
