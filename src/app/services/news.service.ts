import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
route: string[];
  constructor(private http: HttpClient) {
  this.route = [];
  }

  getIndice(): Observable <any> {
    const apiUrl = 'https://hacker-news.firebaseio.com/v0/beststories.json';
    return this.http.get(apiUrl) ;
  }
  getItem(ruta: string): Observable <any> {
    const Urlparte = 'https://hacker-news.firebaseio.com/v0/item/' + ruta + '.json';
    return this.http.get(Urlparte);
  }
}
