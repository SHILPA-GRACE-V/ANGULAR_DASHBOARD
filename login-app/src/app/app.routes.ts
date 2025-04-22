import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { TasksComponent } from './tasks/tasks.component';
import { FaqComponent } from './faq/faq.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'file-manager', component: FileManagerComponent },
  { path: 'letter-box', component: LetterBoxComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'faq', component: FaqComponent }
];


