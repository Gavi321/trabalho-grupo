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

  constructor(private http: HttpClient) { 
    this.objs = [];
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.http.get('https://api.unsplash.com/photos?client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578').subscribe(
      responseData => {
      this.objs = responseData;
      console.log(responseData);}
    , error => {
      console.log(error);}
    , () => {
      console.log("good");
    });
  }
}
