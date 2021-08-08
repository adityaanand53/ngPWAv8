import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getData(i) {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos/${i}`);
  }

  postData(title, body) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts',
      JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      })
      , {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
  }

}
