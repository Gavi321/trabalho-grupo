import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsService } from '../details.service';
import { Img } from '../lista-img/Img';
import { ListaImgComponent } from '../lista-img/lista-img.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  img: Img;
  imgCreated_at: string;

  constructor(detailsService: DetailsService) {
    this.img = detailsService.img;
    this.imgCreated_at = "";

    for(let i=0; i< 10; i++)
    {
      this.imgCreated_at = this.imgCreated_at + this.img.params.created_at.charAt(i);
    }
   }

  ngOnInit(): void {
  }

}
