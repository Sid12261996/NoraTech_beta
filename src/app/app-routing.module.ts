import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BodyComponent} from './components/body/body.component';
import {ContactUsComponent} from './components/ContactUs/contact-us.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CoursePaymentComponent} from './components/course-payment/course-payment.component';
import {EnrollStudentComponent} from './components/course-payment/enroll-student/enroll-student.component';

const routes: Routes = [
  {
    path: 'contact', component: ContactUsComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'course', component: CoursePaymentComponent
  },
  {
    path: 'enrollStudent/:course', component: EnrollStudentComponent
  },
  {
    path: '', component: BodyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
