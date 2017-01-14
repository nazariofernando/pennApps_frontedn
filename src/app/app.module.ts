// built in NgModules
import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { HttpModule }         from '@angular/http';
import { MaterialModule }     from '@angular/material';
import { RouterModule }       from '@angular/router';
import { AngularFireModule}   from 'angularfire2';

//Custon Modules
import { AppRoutingModule }   from './app-routing.module';

//Custom Components
import { AppComponent }           from './app.component';
import { MyHeaderComponent }      from './my-header.component';
import { MyFooterComponent }      from './my-footer.component';
import { AlphaMorphsComponent }   from './alpha-morphs.component';
import { AboutUsComponent }       from './about-us.component';
import { ContactUsComponent }     from './contact-us.component';

//Custom Services
import { AlphaMorphService }  from './alpha-morphs.service';

export const firebaseConfig = {
  apiKey: "AIzaSyCXfN4s-wFU7E0QMlCXXCp4VK8kBSU0WqE",
  authDomain: "alphamorphs.firebaseapp.com",
  databaseURL: "https://alphamorphs.firebaseio.com",
  storageBucket: "alphamorphs.appspot.com",
  messagingSenderId: "499882485459"
};

@NgModule({
  declarations: [
    AppComponent,
    MyHeaderComponent,
    MyFooterComponent,
    AlphaMorphsComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AlphaMorphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
