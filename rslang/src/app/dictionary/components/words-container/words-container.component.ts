import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-words-container',
  templateUrl: './words-container.component.html',
  styleUrls: ['./words-container.component.scss'],
})
export class WordsContainerComponent {
  constructor(public apiService: ApiService) {}
}
