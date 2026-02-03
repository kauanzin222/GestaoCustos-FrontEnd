import { Injectable } from '@angular/core';
import { AbastecimentoInterface } from '../interfaces/AbastecimentoInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AbastecimentoService {

  constructor(private http: HttpClient) { }

  getAbastecimento() {
    return this.http.get<AbastecimentoInterface[]>("http://localhost:8080/Abastecimentos");
  }

  save(abastecimento: AbastecimentoInterface) {
    return this.http.post<AbastecimentoInterface>("http://localhost:8080/Abastecimentos", abastecimento);
  }

  update(abastecimento: AbastecimentoInterface) {
    return this.http.put<AbastecimentoInterface>(`http://localhost:8080/Abastecimentos/${abastecimento.id}`, abastecimento);
  }

  delete(abastecimento: AbastecimentoInterface) {
    return this.http.delete<AbastecimentoInterface>(`http://localhost:8080/Abastecimentos/${abastecimento.id}`);
  }
}
