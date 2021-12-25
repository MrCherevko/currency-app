import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './global/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { HistoryComponent } from './pages/history/history.component';
import { MaterialModule } from './modules/material/material.module';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorService } from './services/calculator.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryService } from './services/history.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalculatorComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, CalculatorService, HistoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
