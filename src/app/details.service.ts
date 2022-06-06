import { Injectable } from '@angular/core';
import { Img } from './lista-img/Img';
import { ListaImgComponent } from './lista-img/lista-img.component';

@Injectable({
  providedIn: 'root',
})
export class DetailsService{

  img: Img;
  objs: Array<Img>;

  constructor() {
    this.img = new Img();
    this.objs = Array<Img>();
  }  

  details_img(id: any): void{
    for(let i=0; i <= this.objs.length; i++)
    {
      if(this.objs[i].params.id == id)
      {
        this.img = this.objs[i];
      }
    }
  }

}