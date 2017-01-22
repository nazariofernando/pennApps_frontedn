//built in NgModule
import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

//custon components
import { AppComponent }           from './app.component';
import { MyHeaderComponent }      from './my-header.component';
import { MyFooterComponent }      from './my-footer.component';
import { AlphaMorphsComponent }   from './alpha-morphs.component';
import { AboutUsComponent }       from './about-us.component';
import { LoginComponent }         from './login.component';
import { ApiTestComponent }       from './api.component';

//routes
const routes: Routes = [
	{ path: '', redirectTo: '/alphaMorph', pathMatch: 'full' },
	{ path: 'alphaMorph', component: AlphaMorphsComponent },
	{ path: 'aboutUs', component: AboutUsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'apiTest', component: ApiTestComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
