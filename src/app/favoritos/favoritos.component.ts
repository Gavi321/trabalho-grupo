import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any;

  constructor(private favoritosService: FavoritosService) {
    this.favoritos = favoritosService.favoritos;
   }

  favoritar(obj: any):void{
    this.favoritosService.favoritar(obj);
    //console.log(this.favoritos)
  }

  desfavoritar(obj:any):void{
    this.favoritosService.desfavoritar(obj);
  }

  ngOnInit(): void {
  }
}
