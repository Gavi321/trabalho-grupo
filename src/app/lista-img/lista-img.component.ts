import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FavoritosComponent } from '../favoritos/favoritos.component';
import { Img } from './Img';
import { FavoritosService } from '../favoritos.service';
import { DetailsService } from '../details.service';

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
  imgCreated_at: string;

  constructor(private http: HttpClient, private favoritosService: FavoritosService, public detailsService: DetailsService) { 
    this.objs = Array<Img>();
    this.latest_or_search = true;
    this.search_input = "";
    this.imgCreated_at = "";
  }

  load_latest(): void{
    this.latest_or_search = true;
    this.subscription = this.http.get(this.query_latest+this.cliente_id).subscribe(
      responseData => {

        for(let i=0; i < 24; i++)
        {
          let newImg = new Img();
          newImg.favorito = false;
          newImg.params = responseData[i];

          for(let y=0; y< 10; y++)
          {
            this.imgCreated_at = this.imgCreated_at + responseData[i].created_at.charAt(y);
          }

          newImg.params.created_at = this.imgCreated_at;
          this.imgCreated_at = "";

          this.objs.push(newImg);
          for(let x=0; x < this.favoritosService.favoritos.length; x++)
          {
              if(this.favoritosService.favoritos[x] != undefined && this.favoritosService.favoritos[x].params.id == responseData[i].id)
              {
                this.objs[i].favorito = true;
              }
          }
        }
        this.detailsService.objs = this.objs;
      }
      
    , error => {
      console.log(error);});
  } 

  details_img(id: any){
    this.detailsService.details_img(id);
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
        let newImg = new Img();
        newImg.favorito = false;
        newImg.params = aux.results[i];
        this.objs.push(newImg);

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

      this.detailsService.objs = this.objs;
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

  favoritar(id: number): void{
    var star = document.getElementById(id.toString());

    for(let i=0; i <= this.objs.length; i++)
    {
      if(this.objs[i].params.id == id)
      {
        if(this.objs.includes(this.objs[i]))
        this.favoritosService.favoritar(this.objs[i], star);
      }
    }
  }
}