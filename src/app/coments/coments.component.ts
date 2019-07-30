import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NewsService } from '../services/news.service';
import { Item } from '../Item';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.sass'] ,
})
export class ComentsComponent implements OnInit {
  @Input() public id?: string;
  comentarios: Item[];
  item: Item;
  fecha: Date;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private snoticia: NewsService
    ) { }

  ngOnInit() {
    this.comentarios = [];
    if (this.id === undefined ) {
      this.id = this.route.snapshot.paramMap.get('id');
    }
    this.getComentario(this.id);
  }

  getComentario(item: string): any {
    this.snoticia.getItem(item).subscribe(responsenoticia => {
      this.item = responsenoticia;
      if (this.item.kids != null) {
      this.item.kids.forEach(e => {
          this.snoticia.getItem(e.toString()).subscribe(responsecoment => {
            this.comentarios.push(responsecoment);
          });
        });
      }
    });
  }
}
