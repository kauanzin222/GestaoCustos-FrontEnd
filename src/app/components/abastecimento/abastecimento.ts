import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { AbastecimentoInterface } from '../../interfaces/AbastecimentoInterface';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';

@Component({
  selector: 'app-abastecimento',
  standalone: false,
  templateUrl: './abastecimento.html',
  styleUrl: './abastecimento.css',
})
export class Abastecimento implements OnChanges {
  // Criando objetos vazios
  @Input()
  abastecimento: AbastecimentoInterface = {} as AbastecimentoInterface;

  @Input()
  postos: PostoInterface[] = [];

  @Output()
  saveEmmiter = new EventEmitter();

  @Input()
  isUpdate?: boolean;

  formGroupAbastecimento: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupAbastecimento = this.formBuilder.group({
      id: { value: null, disabled: true },
      posto: ['', [Validators.required]],
      date: ['', [Validators.required]],
      statusPay: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
  }

  ngOnChanges(): void {
    if (this.isUpdate)
      this.formGroupAbastecimento.setValue(this.abastecimento);
  }

  save() {
    this.submitted = true;
    if (this.formGroupAbastecimento.valid) {
      Object.assign(this.abastecimento, this.formGroupAbastecimento.value);
      this.saveEmmiter.emit(true);
    }
  }

  cancel() {
    this.saveEmmiter.emit(false);
  }

  selectedPosto(posto1: PostoInterface, posto2: PostoInterface) {
    return posto1 && posto2 ? posto1.id === posto2.id : false;
  }

  // Validators
  get afgPosto() {return this.formGroupAbastecimento.get("posto")};
  get afgDate() {return this.formGroupAbastecimento.get("date")};
  get afgStatusPay() {return this.formGroupAbastecimento.get("statusPay")};
  get afgPrice() {return this.formGroupAbastecimento.get("price")};
}
