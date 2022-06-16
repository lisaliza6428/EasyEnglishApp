import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dictionary-page',
  templateUrl: './dictionary-page.component.html',
  styleUrls: ['./dictionary-page.component.scss'],
})
export class DictionaryPageComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    if (this.apiService.currentGroup === 6) {
      this.apiService.getUserHardWords();
    } else {
      this.apiService.getWords();
    }
  }
}
