import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CreateArticleFormComponent } from './components/article-create/create-article.form.component';
import { EditArticleComponent } from './components/edit-article/edit-article.form.component';
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { ListArticlesComponent } from './components/list-articles/list-articles.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { LogoutComponent } from './authentication/logout-component/logout.component';

import { AuthGuard } from './guards/auth.guard.service';
import { AdminGuard } from './guards/admin.guard.service';
import {UserProfileComponent} from './authentication/user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'create',  canActivate: [AuthGuard], component: CreateArticleFormComponent },
  { path: 'details/:id',  canActivate: [AuthGuard], component: ArticleDetailsComponent  },
  { path: 'edit/:id',   component: EditArticleComponent },
  { path: 'delete/:id', redirectTo: 'list',  canActivate: [AdminGuard], pathMatch: 'full' },
  { path: 'userProfile/:username',  canActivate: [AuthGuard], component: UserProfileComponent },
  { path: 'articles', canActivate: [AuthGuard], component: ListArticlesComponent },
  { path: 'register',  component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutesModule {  }


