import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges): void {
  }

  formGroupPosto: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupPosto = formBuilder.group({
      id: { value: null, disabled: true },
      name: ['']
    })
  };

  save() {

  }

  cancel() {
    
  }
}
