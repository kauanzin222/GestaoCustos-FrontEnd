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

  isUpdate: boolean = false;
  showForm: boolean = false;

  // Criando objetos vazios
  postos: PostoInterface[] = [];
  abastecimentos: AbastecimentoInterface[] = [];
  abastecimento: AbastecimentoInterface = {} as AbastecimentoInterface;

  ngOnInit(): void {
    this.loadPostos();
    this.loadAbastecimentos();
  }

  loadAbastecimentos() {
    this.abastecimentoService.getAbastecimento().subscribe({
      next: data => {
        this.abastecimentos = data;
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

  createForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  saveAbastecimento(save: boolean) {
    if (save)
      if (this.isUpdate)
        this.abastecimentoService.update(this.abastecimento).subscribe();
      else {
        this.abastecimentoService.save(this.abastecimento).subscribe({
          next: data => {
            this.abastecimentos.push(data);
            this.showForm = false;
          }
        });
      }


    this.abastecimento = {} as AbastecimentoInterface;
    this.showForm = false;
    this.isUpdate = false;
  }

  updateAbastecimento(selectedAbastecimento: AbastecimentoInterface) {
    this.showForm = true;
    this.isUpdate = true;
    this.abastecimento = selectedAbastecimento;
  }

  deleteAbastecimento(selectedAbastecimento: AbastecimentoInterface) {
    this.abastecimentoService.delete(selectedAbastecimento).subscribe({
      next: () => {
        this.abastecimentos = this.abastecimentos.filter(abastecimento => abastecimento != selectedAbastecimento);
      }
    })
  }
}
