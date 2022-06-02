import { Injectable } from '@angular/core';
import { Img } from './lista-img/Img';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService{

  favoritos: Array<Img>;

  constructor() {
    this.favoritos = Array<Img>();
  }

  favoritar(obj: any): void{
    //var flag para guardar se já é favorito ou n
    let flag;

    for(let i = 0; i < this.favoritos.length; i++)
    {
      if(this.favoritos[i].params.id == obj.params.id)
      {
        //se o id do index for = ao id do obj clicado na estrela flag = 1 (já existe)
        flag = 1;
      }
    }
    if(flag != 1)
    {
      //se flag != 1 (nao existe) adiciona
      this.favoritos.push(obj);
    }
  }

  desfavoritar(obj: any): void{
       
  }
}