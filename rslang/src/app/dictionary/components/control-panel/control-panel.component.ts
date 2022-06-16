import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent {
  currentPage = 0;

  constructor(public apiService: ApiService) {
    this.currentPage = this.apiService.currentPage;
  }

  handleSelectEvent(e: Event) {
    const group = +(e.target as HTMLSelectElement).value;
    this.apiService.currentGroupChange.next(group);
    if (group === 6) {
      console.log('difficult');
      this.apiService.getUserHardWords();
    } else {
      this.apiService.getWords();
    }
  }

  pageChangeEvent(page: number) {
    this.currentPage = page;
    this.apiService.currentPageChange.next(this.currentPage);
    this.apiService.getWords();
  }
}
