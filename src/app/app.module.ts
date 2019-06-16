import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './BaseComponents/FrontPage/front-page.component';
import { ContactUsComponent } from './BaseComponents/FrontPage/contact-us.component';
import { AboutUsComponent } from './BaseComponents/FrontPage/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
