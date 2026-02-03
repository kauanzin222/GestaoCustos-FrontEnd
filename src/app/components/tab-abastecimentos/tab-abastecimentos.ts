import { Component } from '@angular/core';
import { AbastecimentoInterface } from '../../interfaces/AbastecimentoInterface';
import { AbastecimentoService } from '../../services/abastecimento-service';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { PostoService } from '../../services/posto-service';

@Component({
  selector: 'app-tab-abastecimentos',
  standalone: false,
  templateUrl: './tab-abastecimentos.html',
  styleUrl: './tab-abastecimentos.css',
})
export class TabAbastecimentos {

  constructor(private abastecimentoService: AbastecimentoService, private postoService: PostoService
  ) { }

  showForm: boolean = false;

  // Criando objetos vazios
  postos: PostoInterface[] = [];
  abastecimentos: AbastecimentoInterface[] = [];
  abastecimento: AbastecimentoInterface = {} as AbastecimentoInterface;

  ngOnInit(): void {
    this.loadPostos();
  }

  saveAbastecimento() {
    this.abastecimentoService.save(this.abastecimento).subscribe({
      next: data => {
        this.abastecimentos.push(data);
        this.abastecimento = {} as AbastecimentoInterface;
      }
    })
  }

  loadPostos() {
    this.postoService.getPostos().subscribe({
      next: data => {
        this.postos = data;
      }
    })
  }


}
