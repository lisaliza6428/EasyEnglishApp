import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './auth/services/error.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from './shared/ng-material.module';
import { PreloaderComponent } from './core/components/preloader/preloader.component';
import { BurgerMenuComponent } from './core/components/header/burger-menu/burger-menu.component';
import { ApiService } from './dictionary/services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GamesPageComponent } from './core/pages/games-page/games-page.component';
import { StatisticsPageComponent } from './core/pages/statistics-page/statistics-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './core/components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    ErrorPageComponent,
    PreloaderComponent,
    BurgerMenuComponent,
    GamesPageComponent,
    StatisticsPageComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    NgxPaginationModule,
    MatDialogModule,
  ],
  exports: [NgMaterialModule, NgxPaginationModule, BrowserAnimationsModule, ModalComponent],
  entryComponents: [ModalComponent],
  providers: [
    AuthService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
