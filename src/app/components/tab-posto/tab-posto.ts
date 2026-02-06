import { Component } from '@angular/core';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { PostoService } from '../../services/posto-service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net';

@Component({
  selector: 'app-tab-posto',
  standalone: false,
  templateUrl: './tab-posto.html',
  styleUrl: './tab-posto.css',
})
export class TabPosto {
  constructor(private postoService: PostoService, private modalService: NgbModal) { }

  showForm: boolean = false;
  isUpdate: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Criando objetos vazios
  posto: PostoInterface = {} as PostoInterface;
  postos: PostoInterface[] = [];
  deleteSelected: PostoInterface = {} as PostoInterface;

  ngOnInit(): void {
    this.loadPostos();
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

  savePosto(save: boolean) {
    if (save)
      if (this.isUpdate) {
        this.postoService.update(this.posto).subscribe({
          complete: () => {
            this.successMessage = `Posto ${this.posto.name} atualizado com sucesso!`;
          }
        });
      }
      else {
        this.postoService.save(this.posto).subscribe({
          next: data => {
            this.postos.push(data);
          },
          complete: () => {
            this.successMessage = `Posto cadastrado com sucesso!`;
          }
        })
      }

    this.posto = {} as PostoInterface;
    this.isUpdate = false;
    this.showForm = false;
  }

  updatePosto(selectedPosto: PostoInterface) {
    this.posto = selectedPosto;
    this.showForm = true;
    this.isUpdate = true;
  }

  deletePosto(modal: any, selectedPosto: PostoInterface) {
    this.deleteSelected = selectedPosto;

    this.modalService.open(modal).result.then(
      (confirm) => {
        if (confirm) {
          this.postoService.delete(selectedPosto).subscribe({
            next: () => {
              this.postos = this.postos.filter(posto => posto != selectedPosto);
            },
            error: () => {
              this.errorMessage = `Posto ${selectedPosto.name} contém abastecimentos registrados.`;
            },
            complete: () => {
              this.successMessage = `Posto ${selectedPosto.name} excluído com sucesso!`;
            }
          });
        }
      }
    )
  }
}
