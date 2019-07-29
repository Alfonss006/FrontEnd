import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { noticia } from '../noticia';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.sass']
})
export class NoticiaComponent implements OnInit , AfterViewInit {
  rutas: string[];
  noticias: noticia[];
  Head: string [];
  @ViewChild(MatSort, ) sort: MatSort;
  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  Data = new MatTableDataSource<noticia>();


  constructor(private SNews: NewsService) {
    this.rutas = [];
    this.noticias = [];
    this.Head = ['Titulo'];
  }

  ngAfterViewInit() {
    this.traertop();
    this.paginator.showFirstLastButtons = true;
    this.Data.paginator = this.paginator;
    this.Data.data = this.noticias;
  }

  ngOnInit() {
  }

  traertop(): void {
    this.SNews.getIndice().subscribe(x => {
      this.rutas = x;
      console.log(x);
      this.TodaNoticia();
      });
  }
 TodaNoticia(): void {
  this.rutas.forEach(e => {
    this.SNews.getItem(e).subscribe( x => {
    this.noticias.push(x);
    this.Data.data = this.noticias;
    this.Data._updateChangeSubscription();
    });
  });
 }
}
