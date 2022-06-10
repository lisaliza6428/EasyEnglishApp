import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {}

  playAudio(wordId: string) {

    console.log('click');
  }
}
