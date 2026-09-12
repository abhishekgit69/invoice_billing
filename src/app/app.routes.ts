import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [

     { path: 'home', component: Dashboard, title: 'Dashboard',data: { favicon: 'favicon1.ico' } },  

];
