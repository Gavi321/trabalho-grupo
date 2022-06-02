import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FavoritosComponent } from '../favoritos/favoritos.component';
import { Img } from './Img';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-lista-img',
  templateUrl: './lista-img.component.html',
  styleUrls: ['./lista-img.component.css']
})
export class ListaImgComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  objs: Array<Img>;
  p: number = 1;
  query_latest = "https://api.unsplash.com/photos?order_by=latest&per_page=24";
  query_search = "https://api.unsplash.com/search/photos?per_page=24&query=";
  cliente_id = "&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";
  latest_or_search: boolean;
  search_input: string;

  constructor(private http: HttpClient, private favoritosComponent: FavoritosComponent, private favoritosService: FavoritosService) { 
    this.objs = Array<Img>();
    this.latest_or_search = true;
    this.search_input = "";
  }

  load_latest(): void{
    this.latest_or_search = true;
    this.subscription = this.http.get(this.query_latest+this.cliente_id).subscribe(
      responseData => {

        for(let i=0; i < 24; i++)
        {
          this.objs.push(new Img(false, responseData[i]));
          for(let x=0; x < this.favoritosService.favoritos.length; x++)
          {
              if(this.favoritosService.favoritos[x] != undefined && this.favoritosService.favoritos[x].params.id == responseData[i].id)
              {
                this.objs[i].favorito = true;
              }
          }
        }
        console.log(this.objs);
      }
    , error => {
      console.log(error);});
  } 

  closeModal():void{
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    this.load_latest();
  }

  search_query(): void{
    var modal = document.getElementById("myModal");

    this.latest_or_search = false;
    this.subscription = this.http.get(this.query_search+this.search_input+this.cliente_id).subscribe(
      responseData => {
      let aux: any;
      aux = responseData;

      this.objs.splice(0);
      
      for(let i=0; i < 24; i++)
      {
        this.objs.push(new Img(false, aux.results[i]));
        for(let x=0; x < this.favoritosService.favoritos.length; x++)
        {
            if(this.favoritosService.favoritos[x] != undefined && this.favoritosService.favoritos[x].params.id == aux.results[i].id)
            {
              this.objs[i].favorito = true;
            }
        }
      }

      if(this.objs.length == 0)
      {
        modal.style.display = "block";
      }
    }
    , error => {
      console.log(error);});
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.load_latest();
  }

  favoritar(i: number): void{
    var star = document.getElementById(i.toString());
    star.style.color = "yellow";

    this.favoritosComponent.favoritar(this.objs[i]);

    if(this.objs.includes(this.objs[i]))
    this.objs[i].favorito = true;
  }
}

/*

for(let i=0; i < 24;i++)
{
  for(let x=0; x < this.favoritosService.favoritos.length+1; x++)
  {
    if(this.favoritosService.favoritos[x] == responseData[i])
    {
      //console.log("if");
      this.objs[i].favorito = true;
    }else{
      //console.log("else");
      this.objs.push(new Img(false, responseData[i]));
    }
  }
}

*/