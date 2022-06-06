import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../details.service';
import { DetailsComponent } from '../details/details.component';
import { FavoritosService } from '../favoritos.service';
import { ListaImgComponent } from '../lista-img/lista-img.component';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any;

  constructor(private favoritosService: FavoritosService, public detailsService: DetailsService) {
    this.favoritos = favoritosService.favoritos;
   }

  ngOnInit(): void {
  }
}
