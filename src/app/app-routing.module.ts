import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignInComponent } from './home/sign-in/sign-in.component';
import { AuthGard } from './core/auth/auth.guard';
import { SignUpComponent } from './home/sign-up/sign-up.component';

const routes: Routes = [
    { path: '', component: SignInComponent, canActivate: [AuthGard] },
    { path: 'signup', component: SignUpComponent },
    {
        path: 'user/:user', component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { path: 'p/add', component: PhotoFormComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }