import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../dictionary/services/api.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  stat: any;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.stat = this.apiService.getStatistics().subscribe((val: any) => (this.stat = val));
  }
}
