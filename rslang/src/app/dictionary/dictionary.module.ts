import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsContainerComponent } from './components/words-container/words-container.component';
import { WordComponent } from './components/word/word.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryPageComponent } from './pages/dictionary-page/dictionary-page.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollToTopButtonComponent } from './components/scroll-to-top-button/scroll-to-top-button.component';

@NgModule({
  declarations: [
    WordsContainerComponent,
    WordComponent,
    DictionaryPageComponent,
    ControlPanelComponent,
    ScrollToTopButtonComponent,
  ],
  imports: [CommonModule, DictionaryRoutingModule, NgxPaginationModule],
})
export class DictionaryModule {}
