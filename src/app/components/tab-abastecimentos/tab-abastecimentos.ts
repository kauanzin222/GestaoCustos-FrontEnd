import { Component, ViewChild } from '@angular/core';
import { AbastecimentoInterface } from '../../interfaces/AbastecimentoInterface';
import { AbastecimentoService } from '../../services/abastecimento-service';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { PostoService } from '../../services/posto-service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tab-abastecimentos',
  standalone: false,
  templateUrl: './tab-abastecimentos.html',
  styleUrl: './tab-abastecimentos.css',
})
export class TabAbastecimentos {
  @ViewChild('myAlert', { static: false }) alert!: NgbAlert;

  staticAlert: boolean = true;

  constructor(private abastecimentoService: AbastecimentoService, private postoService: PostoService, private modalService: NgbModal
  ) { }

  // Variáveis de Alert
  alertMessage: string | null = null;
  typeAlert: string = "";
  errorMessage: string | null = null;
  successMessage: string | null = null;

  isUpdate: boolean = false;
  showForm: boolean = false;

  // Criando objetos vazios
  postos: PostoInterface[] = [];
  deleteSelected: AbastecimentoInterface = {} as AbastecimentoInterface
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
        this.abastecimentoService.update(this.abastecimento).subscribe({
          complete: () => {
            this.successMessage = `Abastecimento atualizado com sucesso!`
          }
        });
      else {
        this.abastecimentoService.save(this.abastecimento).subscribe({
          next: data => {
            this.abastecimentos.push(data);
            this.showForm = false;
          },
          complete: () => {
            this.showAlert('success', 'Abastecimento cadastrado com sucesso!');
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

  deleteAbastecimento(modal: any, selectedAbastecimento: AbastecimentoInterface) {
    this.deleteSelected = selectedAbastecimento;

    this.modalService.open(modal).result.then(
      (confirm) => {
        if (confirm) {
          this.abastecimentoService.delete(selectedAbastecimento).subscribe({
            next: () => {
              this.abastecimentos = this.abastecimentos.filter(abastecimento => abastecimento != selectedAbastecimento);
            },
            complete: () => {
              this.successMessage = `Abastecimento #${selectedAbastecimento.id} excluído com sucesso!`
            }
          })
        }
      }
    );
  }

  updateStatusPay(selectedAbastecimento: AbastecimentoInterface) {
    selectedAbastecimento.statusPay = true;
    this.abastecimento = selectedAbastecimento;
    this.isUpdate = true;

    this.saveAbastecimento(true);
  }

  showAlert(type: string, message: string) {
    this.alertMessage = message;
    this.typeAlert = type;
    setTimeout(() => this.alert.close(), 5000)
  }
}
