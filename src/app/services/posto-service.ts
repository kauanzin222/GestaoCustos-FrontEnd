import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostoInterface } from '../interfaces/PostoInterface';

@Injectable({
  providedIn: 'root',
})
export class PostoService {
  constructor(private http: HttpClient) { }

  getPostos() {
    return this.http.get<PostoInterface[]>("http://localhost:8080/postos");
  }
}
