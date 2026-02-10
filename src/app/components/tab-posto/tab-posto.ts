import { Component, ViewChild } from '@angular/core';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { PostoService } from '../../services/posto-service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net';
import { IconALert, TypeAlert } from '../../models/enums';

@Component({
  selector: 'app-tab-posto',
  standalone: false,
  templateUrl: './tab-posto.html',
  styleUrl: './tab-posto.css',
})
export class TabPosto {
  constructor(private postoService: PostoService, private modalService: NgbModal) { }

  @ViewChild('myAlert', { static: false }) alert!: NgbAlert;

  // Enums
  typeAlertEnum = TypeAlert;
  iconAlertEnum = IconALert;

  // Variáveis de Alert
  alertMessage: string | null = null;
  iconAlert: string | null = null;
  typeAlert: string = '';

  showForm: boolean = false;
  isUpdate: boolean = false;

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
            this.showAlert(this.typeAlertEnum.success, `Posto atualizado com sucesso!`, this.iconAlertEnum.success);
          }
        });
      }
      else {
        this.postoService.save(this.posto).subscribe({
          next: data => {
            this.postos.push(data);
          },
          complete: () => {
            this.showAlert(this.typeAlertEnum.success, `Posto cadastrado com sucesso!`, this.iconAlertEnum.success); 
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
              this.showAlert(this.typeAlertEnum.warning, `Posto ${selectedPosto.name} contém abastecimentos registrados.`, this.iconAlertEnum.error);
            },
            complete: () => {
              this.showAlert(this.typeAlertEnum.success, `Posto ${selectedPosto.name} excluído com sucesso!`, this.iconAlertEnum.error) 
            }
          });
        }
      }
    )
  }

  showAlert(type: string, message: string, icon: string) {
    this.alertMessage = message;
    this.typeAlert = type;
    this.iconAlert = icon;
    setTimeout(() => this.alert.close(), 5000)
  }
}
