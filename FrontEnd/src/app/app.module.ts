import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/Router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '@app/app.routing';

// Component
import { AppComponent } from '@app/app.component';
import { SignupComponent } from '@app/signup/signup.component';
import { FrontPageComponent } from '@app/frontPage/frontPage.component';
import { LoginComponent } from '@app/login/login.component';

// Service
import { AuthGuardService } from '@service/AuthGuard.service';
import { ApiService } from '@service/api.service';
import { UidService } from '@service/uid.service';
import { TodosService } from '@service/todos.service';
import { LoginService } from '@service/login.service';
import { CommodityService } from '@service/commodity.service';

// Pipe && Component
import { PipeModule } from '@pipeModule';

// import { xxx } from '@comModule';
import { TodosComponent } from './todos/todos.component';
import { ConfrimPageComponent } from './confrimPage/confrimPage.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FrontPageComponent,
    LoginComponent,
    TodosComponent,
    ConfrimPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PipeModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    ApiService,
    UidService,
    TodosService,
    LoginService,
    AuthGuardService,
    CommodityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
