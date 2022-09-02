import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//Modulos
import { DashboardModule } from '@gdp/dashboard/modules';
import { SharedModule } from '@gdp/shared/modules';
import { AuthModule } from '@gdp/auth/modules';

//Guards
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AuthService } from './modules/auth/service/auth.service';
import { DurationPickerModule } from 'ngx-duration-picker';

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
    DurationPickerModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
