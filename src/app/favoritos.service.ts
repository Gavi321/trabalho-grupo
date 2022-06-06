import { Injectable } from '@angular/core';
import { DetailsService } from './details.service';
import { Img } from './lista-img/Img';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService{

  favoritos: Array<Img>;
  objs: Array<Img>;
  imgCreated_at: string;
  query_latest = "https://api.unsplash.com/photos?order_by=latest&per_page=24";
  cliente_id = "&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  constructor() {
    this.favoritos = Array<Img>();
    this.objs = Array<Img>();
  }

  favoritar(obj: any, starElement: any): void{
    //var flag para guardar se já é favorito ou n
    let flag;

    for(let i = 0; i < this.favoritos.length; i++)
    {
      if(this.favoritos[i].params.id == obj.params.id)
      {
        //se o id do index for = ao id do obj clicado na estrela flag = 1 (já existe), é removido
        flag = 1;
        this.desfavoritar(obj);
        starElement.style.color = "lightgray";
      }
    }
    if(flag != 1)
    {
      //se flag != 1 (nao existe) adiciona
      this.favoritos.push(obj);
      starElement.style.color = "yellow";
    }
  }

  desfavoritar(obj: any): void{
      this.favoritos.splice(obj);
  }
}