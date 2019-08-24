import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BodyComponent} from './components/body/body.component';
import {FooterComponent} from './components/footer/footer.component';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ContactUsComponent} from './components/ContactUs/contact-us.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatRadioModule,
  MatSelectModule, MatStepperModule,
  MatTabsModule, MatTreeModule
} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {CoursePaymentComponent} from './components/course-payment/course-payment.component';
import {MatTableModule} from '@angular/material';

import {WindowRefService} from '../Services/window-ref.service';
import {EnrollStudentComponent} from './components/course-payment/enroll-student/enroll-student.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    CoursePaymentComponent,
    EnrollStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatTreeModule,
    MatRadioModule,
  ],

  providers: [HttpClient, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
