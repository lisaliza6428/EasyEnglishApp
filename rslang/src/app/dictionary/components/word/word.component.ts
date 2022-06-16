import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { WordModel } from '../../services/models';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent {
  constructor(public apiService: ApiService) {}

  @Input() word!: WordModel;

  none = '';

  playAudio(wordId: string) {
    console.log(`clicked ${wordId}`);
  }

  addToDifficultAction(wordId: string) {
    if (this.word.userWord) {
      this.word.userWord.difficulty = 'hard';
      this.apiService.updateUserWord(wordId, this.word.userWord);
    } else {
      const wordInfo = { difficulty: 'hard', optional: { answers: ' ' } };
      this.word.userWord = wordInfo;
      this.apiService.createUserWord(wordId, wordInfo);
    }
  }

  addToLearnedAction(wordId: string) {
    if (this.word.userWord) {
      this.word.userWord.difficulty = 'learned';
      this.apiService.updateUserWord(wordId, this.word.userWord);
    } else {
      const wordInfo = { difficulty: 'learned', optional: { answers: ' ' } };
      this.word.userWord = wordInfo;
      this.apiService.createUserWord(wordId, wordInfo);
    }
    this.apiService.updateStatisticFromDictionaryPage('add');
  }

  deleteFromDifficultAction(wordId: string) {
    if (this.word.userWord) {
      this.word.userWord.difficulty = 'inProgress';
      this.apiService.updateUserWord(wordId, this.word.userWord);
      this.none = 'none';
    }
  }
}
