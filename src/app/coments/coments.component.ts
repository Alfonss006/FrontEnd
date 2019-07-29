import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { comentario } from '../comentario';
import { NewsService } from '../services/news.service';
import { noticia } from '../noticia';

@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.sass']
})
export class ComentsComponent implements OnInit {
  id: string;
  comentarios: comentario[];
  noticia: noticia;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private snoticia: NewsService
    ) { }

  ngOnInit() {
    this.comentarios = [];
    this.getComentario();
  }

  getComentario(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.snoticia.getItem(this.id).subscribe(responsenoticia => {
      this.noticia = responsenoticia;
      this.noticia.kids.forEach(e => {
        this.snoticia.getItem(e.toString()).subscribe(responsecoment => {
        this.comentarios.push(responsecoment);
        });
      });
    });
  }
}
