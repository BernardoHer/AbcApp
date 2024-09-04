import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'client-list',
    pathMatch: 'full'
  },
  {
    path: 'client-list',
    component: ClientListComponent
  },
  {
    path: 'client-form',
    component: ClientFormComponent
  },
  {
    path: 'client-form/:clientId',
    component: ClientFormComponent
  },
];
