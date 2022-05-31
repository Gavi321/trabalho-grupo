import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lista-img',
  templateUrl: './lista-img.component.html',
  styleUrls: ['./lista-img.component.css']
})
export class ListaImgComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  objs: any;
  p: number = 1;
  query_latest = "https://api.unsplash.com/photos?order_by=latest&per_page=24";
  query_search = "https://api.unsplash.com/search/photos?query=";
  cliente_id = "&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";
  latest_or_search: boolean;
  search_input: string;

  constructor(private http: HttpClient) { 
    this.objs = [];
    this.latest_or_search = true;
    this.search_input = "";
  }

  load_latest(): void{
    this.latest_or_search = true;
    this.subscription = this.http.get(this.query_latest+this.cliente_id).subscribe(
      responseData => {
      this.objs = responseData;}
    , error => {
      console.log(error);});
  }

  closeModal():void{
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  search_query(): void{
    var modal = document.getElementById("myModal");

    this.latest_or_search = false;
    this.subscription = this.http.get(this.query_search+this.search_input+this.cliente_id).subscribe(
      responseData => {
      this.objs = responseData;
      console.log(this.objs)
      if(this.objs.total == 0)
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
}

