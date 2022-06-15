import { Injectable } from '@angular/core';
import { BASE_URL, WORDS_PER_PAGE } from '../../shared/consts';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WordModel } from './models';
import { AuthService } from '../../auth/services/auth.service';
import { AuthDataModel } from '../../auth/models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  userId = '';

  currentPage = 1;

  currentGroup = 0;

  words!: WordModel[];

  wordsChange: Subject<WordModel[]> = new Subject<WordModel[]>();

  currentPageChange: Subject<number> = new Subject<number>();

  currentGroupChange: Subject<number> = new Subject<number>();

  constructor(public http: HttpClient, public router: Router, public authService: AuthService) {
    this.wordsChange.subscribe((value) => {
      this.words = value;
    });
    this.currentPageChange.subscribe((value) => {
      this.currentPage = value;
    });
    this.currentGroupChange.subscribe((value) => {
      this.currentGroup = value;
    });
    this.getUserId();
  }

  getUserId() {
    const auth = localStorage.getItem('token');
    if (auth) {
      const authData: AuthDataModel = JSON.parse(auth);
      this.userId = authData.userId;
    }
  }

  getWords() {
    console.log(this.authService.isLogged);
    if (this.authService.isLogged) {
      this.http
        .get<any[]>(
          BASE_URL +
            `users/${this.userId}/aggregatedWords?&filter={"$and": [{"group": ${this.currentGroup}}, {"page": ${
              this.currentPage - 1
            }}]}&wordsPerPage=${WORDS_PER_PAGE}`
        )
        .subscribe((value) => {
          const filtered = value[0].paginatedResults.sort((a: WordModel, b: WordModel) => a.word.localeCompare(b.word));
          this.words = filtered;
        });
    } else {
      this.http
        .get<any[]>(
          BASE_URL + `words?page=${this.currentPage - 1}&group=${this.currentGroup}&wordsPerPage=${WORDS_PER_PAGE}`
        )
        .subscribe((value) => {
          this.words = value.sort((a: WordModel, b: WordModel) => a.word.localeCompare(b.word));
        });
    }
  }

  updateUserWord(wordId: string, word: any) {
    this.http.put<any[]>(BASE_URL + `/users/${this.userId}/words/${wordId}`, word).subscribe((value) => {
      console.log(value);
    });
  }
}
