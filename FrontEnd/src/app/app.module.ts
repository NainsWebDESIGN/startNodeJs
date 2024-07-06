import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';

// Service
import { ApiService } from './api.service';

// Pipe && Component
// import { xxx } from '@pipeModule';
// import { xxx } from '@comModule';
import { SignupComponent } from './signup/signup.component';
import { FrontPageComponent } from './frontPage/frontPage.component';


@NgModule({
  declarations: [		
    AppComponent,
      SignupComponent,
      FrontPageComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
