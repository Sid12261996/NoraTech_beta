import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FrontPageComponent} from './BaseComponents/FrontPage/front-page.component';
import {ContactUsComponent} from './BaseComponents/FrontPage/contact-us.component';
import {AboutUsComponent} from './BaseComponents/FrontPage/about-us.component';
import {LoginComponent} from './login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ContactUsComponent,
    AboutUsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
