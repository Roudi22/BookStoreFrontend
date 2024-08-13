import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
export const routes: Routes = [
{path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "home", component: HomeComponent},
  {path: "add-book", component: AddBookComponent},
  {path: "edit-book/:id", component: EditBookComponent},
  { path: 'add-quote', component: AddQuoteComponent }
];
