import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { OpenForm } from './components/open-form/open-form';
import { OpenForm } from './components/open-form/open-form';

export const routes: Routes = [

     { path: 'home', component: Dashboard, title: 'Dashboard',data: { favicon: 'favicon1.ico' } },  
     { path: 'generate-invoice', component: OpenForm, title: 'Generate Invoice',data: { favicon: 'favicon1.ico' } },
     { path: '', redirectTo: 'home', pathMatch: 'full' },
     { path: 'generate-invoice', component: OpenForm, title: 'Generate Invoice',data: { favicon: 'favicon1.ico' } },


];
