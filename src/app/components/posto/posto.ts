import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-posto',
  standalone: false,
  templateUrl: './posto.html',
  styleUrl: './posto.css',
})
export class Posto implements OnChanges {
  // Construindo objetos vazios
  @Input()
  posto: PostoInterface = {} as PostoInterface;

  @Input()
  postos: PostoInterface[] = [];

  @Input() 
  isUpdate?: boolean;

  @Output()
  saveEmitter = new EventEmitter();

  ngOnChanges(): void {
  }

  formGroupPosto: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupPosto = this.formBuilder.group({
      id: { value: null, disabled: true },
      name: ['']
    })
  };

  save() {
    Object.assign(this.posto, this.formGroupPosto.value);
    this.saveEmitter.emit(true);
  }

  cancel() {
    this.saveEmitter.emit(false);
  }
}
