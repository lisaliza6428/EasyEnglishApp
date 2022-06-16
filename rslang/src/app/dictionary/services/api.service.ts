import { Injectable } from '@angular/core';
import { BASE_URL, emptyUserStatistics, WORDS_PER_PAGE } from '../../shared/consts';
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
    //console.log(this.authService.isLogged);
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
          console.log(filtered);
        });
    } else {
      this.http
        .get<any[]>(
          BASE_URL + `words?page=${this.currentPage - 1}&group=${this.currentGroup}&wordsPerPage=${WORDS_PER_PAGE}`
        )
        .subscribe((value) => {
          this.words = value.sort((a: WordModel, b: WordModel) => a.word.localeCompare(b.word));
          console.log(this.words);
        });
    }
  }

  createUserWord(wordId: string, word: any) {
    this.http.post<any[]>(BASE_URL + `users/${this.userId}/words/${wordId}`, { ...word }).subscribe((value) => {
      console.log(value);
    });
  }

  updateUserWord(wordId: string, word: any) {
    this.http.put<any[]>(BASE_URL + `users/${this.userId}/words/${wordId}`, { ...word }).subscribe((value) => {
      console.log(value);
    });
  }

  getUserHardWords() {
    this.http
      .get<any[]>(
        BASE_URL +
          `users/${this.userId}/aggregatedWords?&wordsPerPage=3600&filter={"$and":[{"userWord.difficulty":"hard"}]}`
      )
      .subscribe((value) => {
        this.words = value[0].paginatedResults.sort((a: WordModel, b: WordModel) => a.word.localeCompare(b.word));
      });
  }

  getUserStatistics() {
    console.log(this.userId);
    return this.http.get<any[]>(BASE_URL + `users/${this.userId}/statistics`).subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        if (error.status === 404) {
          this.updateUserStatistics(emptyUserStatistics);
        }
      }
    );
  }

  getStatistics() {
    return this.http.get<any>(BASE_URL + `users/${this.userId}/statistics`);
  }

  updateUserStatistics(body: any) {
    this.http.put<any[]>(BASE_URL + `users/${this.userId}/statistics`, body).subscribe((value) => {
      console.log(value);
    });
  }

  updateStatisticFromDictionaryPage(param: string) {
    this.http.get<any>(BASE_URL + `users/${this.userId}/statistics`).subscribe(
      (value) => {
        if (param === 'add') {
          value.learnedWords++;
        }
        if (param === 'subtract') {
          value.learnedWords--;
        }
        delete value.id;
        this.updateUserStatistics(value);
      },
      (error) => {
        if (error.status === 404) {
          this.updateUserStatistics(emptyUserStatistics);
        }
      }
    );
  }
}
