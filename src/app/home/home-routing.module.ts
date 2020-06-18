import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginGuard } from '../core/auth/login.guard';

const routes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [LoginGuard], children: [
            {
                path: '', component: SignInComponent,
                data: {
                    title: 'Sing in'
                }
            },
            {
                path: 'signup', component: SignUpComponent,
                data: {
                    title: 'Sing up'
                }
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }