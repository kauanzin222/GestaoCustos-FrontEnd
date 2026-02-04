import { Component } from '@angular/core';
import { PostoInterface } from '../../interfaces/PostoInterface';
import { PostoService } from '../../services/posto-service';

@Component({
  selector: 'app-tab-posto',
  standalone: false,
  templateUrl: './tab-posto.html',
  styleUrl: './tab-posto.css',
})
export class TabPosto {
  constructor(private postoService: PostoService) {}
  
  isUpdate: boolean = false;

  // Criando objetos vazios
  posto: PostoInterface = {} as PostoInterface;
  postos: PostoInterface[] = [];

  savePosto(save: boolean) {
    if(save) {
      this.postoService.save(this.posto).subscribe({
        next: data => {
          this.postos.push(data);
        }
      })
    }

    this.posto = {} as PostoInterface;
    this.isUpdate = false;
  }


}
