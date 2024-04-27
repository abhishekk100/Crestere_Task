import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { HomeComponent } from './home/home.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [
  {path:'reactive-form/:id' , component:ReactiveFormComponent},
{path:'home', component:HomeComponent},
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'**', component:ChildComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
