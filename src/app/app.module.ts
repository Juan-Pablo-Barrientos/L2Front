import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//Modules
import { DashboardModule } from '@gdp/dashboard/modules';
import { SharedModule } from '@gdp/shared/modules';
import { AuthModule } from '@gdp/auth/modules';

//Guards
import { AuthGuard } from '@gdp/auth/guards';
import { AuthService } from '@gdp/auth/services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    DashboardModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
