import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClientsComponent } from './create-clients/create-clients.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create_clients/:mode', component: CreateClientsComponent },
  { path: 'list_clients', component: ListClientsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
