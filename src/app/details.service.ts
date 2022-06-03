import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Img } from './lista-img/Img';
import { ListaImgComponent } from './lista-img/lista-img.component';

@Injectable({
  providedIn: 'root',
})
export class DetailsService{

  objs: Array<Img>;
  img: Img;

  constructor(private _Activatedroute:ActivatedRoute) {
    this.img = new Img();
  }
  

}