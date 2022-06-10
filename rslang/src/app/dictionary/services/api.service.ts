import { Injectable, OnInit } from '@angular/core';
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
  currentPage = 0;

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
    this.getWords();
  }

  getWords() {
    if (this.authService.isLogged) {
      const auth = localStorage.getItem('token');
      //console.log(auth);
      let userId = '';
      if (auth) {
        const authData: AuthDataModel = JSON.parse(auth);
        userId = authData.userId;
      }
      this.http
        .get<any[]>(
          BASE_URL +
            `users/${userId}/aggregatedWords?&filter={"$and": [{"group": ${this.currentGroup}}, {"page": ${this.currentPage}}]}&wordsPerPage=${WORDS_PER_PAGE}`
        )
        .subscribe((value) => {
          //console.log(value);
          this.words = value[0].paginatedResults;
        });
    } else {
      this.http
        .get<any[]>(
          BASE_URL + `words?page=${this.currentPage}&group=${this.currentGroup}&wordsPerPage=${WORDS_PER_PAGE}`
        )
        .subscribe((value) => {
          //console.log(value);
          this.words = value;
        });
    }
  }
}
