import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ListaImgComponent } from './lista-img/lista-img.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailsComponent } from './details/details.component';

const routes: Routes=[
  {path:'', component: HomeComponent},
  {path:'lista-img', component: ListaImgComponent},
  {path:'favoritos', component: FavoritosComponent},
  {path:'details/:id', component: DetailsComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListaImgComponent,
    FavoritosComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [FavoritosComponent, ListaImgComponent, DetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
