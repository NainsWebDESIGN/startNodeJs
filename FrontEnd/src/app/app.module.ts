import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';

// Service
import { ApiService } from './service/api.service';
import { UidService } from './service/uid.service';
import { TodosService } from '@service/todos.service';
import { LoginService } from '@service/login.service';
// Pipe && Component
import { PipeModule } from '@pipeModule';
// import { xxx } from '@comModule';
import { SignupComponent } from './signup/signup.component';
import { FrontPageComponent } from './frontPage/frontPage.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FrontPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PipeModule
  ],
  providers: [ApiService, UidService, TodosService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
