import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontPageComponent} from "./BaseComponents/FrontPage/front-page.component";
import {ContactUsComponent} from "./BaseComponents/FrontPage/contact-us.component";
import {LoginComponent} from "./BaseComponents/login/login.component";

const routes: Routes = [{
  path: '', component: FrontPageComponent,
  children: [
    {path: 'ContactUs',
      component: ContactUsComponent},
    {path: 'Login',
    component: LoginComponent}
      ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
