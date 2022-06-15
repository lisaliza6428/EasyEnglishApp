import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { AuthService } from './auth/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './auth/services/error.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthButtonComponent } from './core/components/header/auth-button/auth-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from './shared/ng-material.module';
import { PreloaderComponent } from './core/components/preloader/preloader.component';
import { BurgerMenuComponent } from './core/components/header/burger-menu/burger-menu.component';
import { ApiService } from './dictionary/services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GamesPageComponent } from './core/pages/games-page/games-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomePageComponent,
    ErrorPageComponent,
    AuthButtonComponent,
    PreloaderComponent,
    BurgerMenuComponent,
    GamesPageComponent,
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
  ],
  exports: [NgMaterialModule, NgxPaginationModule],
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
