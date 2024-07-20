import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { FrontPageComponent } from '@app/frontPage/frontPage.component';
import { SignupComponent } from '@app/signup/signup.component';
import { LoginComponent } from '@app/login/login.component';
import { TodosComponent } from '@app/todos/todos.component';
import { ConfrimPageComponent } from '@app/confrimPage/confrimPage.component';

// service
import { AuthGuardService } from '@service/AuthGuard.service';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'front', component: FrontPageComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: TodosComponent, pathMatch: 'full' },
      { path: 'todos', component: TodosComponent },
      { path: 'confrim/:id', component: ConfrimPageComponent },
      { path: '**', component: TodosComponent, pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // 使用萬用路由時，一定要放在最後一個路由定義中！
  { path: '**', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }