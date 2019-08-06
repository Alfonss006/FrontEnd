import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Item } from '../Item';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.sass']
})
export class NoticiaComponent implements OnInit , AfterViewInit {
  rutas: string[];
  noticias: Item[];
  Head: string [];
  fecha: Date;
  cargado = true;
  @ViewChild(MatSort, ) sort: MatSort;
  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  Data = new MatTableDataSource<Item>();


  constructor(private SNews: NewsService) {
    this.rutas = [];
    this.noticias = [];
    this.Head = ['Titulo'];
  }

  ngAfterViewInit() {
    this.paginator.showFirstLastButtons = true;
    this.Data.paginator = this.paginator;
    this.Data.data = this.noticias;
  }

  ngOnInit() {
    this.traertop();
  }

  traertop(): void {
    this.SNews.getIndice().subscribe(x => {
      this.rutas = x;
      this.TodaNoticia();
      });
  }
 TodaNoticia(): void {
  this.rutas.forEach(e => {
    this.SNews.getItem(e).subscribe( x => {
    this.noticias.push(x);
    this.Data.data = this.noticias;
    this.cargado = false;
    this.Data._updateChangeSubscription();
    });
  });
 }
}
