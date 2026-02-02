import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbastecimentoInterface } from '../../interfaces/AbastecimentoInterface';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-abastecimento',
  standalone: false,
  templateUrl: './abastecimento.html',
  styleUrl: './abastecimento.css',
})
export class Abastecimento {
  // Criando objetos vazios
  @Input()
  abastecimento: AbastecimentoInterface = {} as AbastecimentoInterface;
  
  @Input()
  postos: PostoInterface[] = [];

  @Output()
  saveEmmiter = new EventEmitter();

  formGroupAbastecimento: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupAbastecimento = this.formBuilder.group({
      posto: [''],
      date: [''],
      statusPay: [''],
      price: ['']
    })
  }

  save() {
    Object.assign(this.abastecimento, this.formGroupAbastecimento.value);
    this.saveEmmiter.emit();
  }
}
