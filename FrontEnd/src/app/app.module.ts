import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '@app/app.routing';

// Component
import { AppComponent } from '@app/app.component';
import { SignupComponent } from '@app/signup/signup.component';
import { FrontPageComponent } from '@app/frontPage/frontPage.component';
import { LoginComponent } from '@app/login/login.component';
import { TodosComponent } from './todos/todos.component';
import { ConfrimPageComponent } from './confrimPage/confrimPage.component';
import { SuccessComponent } from './success/success.component';

// Service
import { AuthGuardService } from '@service/AuthGuard.service';
import { ApiService } from '@service/api.service';
import { UidService } from '@service/uid.service';
import { TodosService } from '@service/todos.service';
import { LoginService } from '@service/login.service';
import { CommodityService } from '@service/commodity.service';
import { FormDataService } from '@service/formData.service';

// Pipe && Component
import { PipeModule } from '@pipeModule';

// import { xxx } from '@comModule';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FrontPageComponent,
    LoginComponent,
    TodosComponent,
    ConfrimPageComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PipeModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    UidService,
    TodosService,
    LoginService,
    AuthGuardService,
    CommodityService,
    FormDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
