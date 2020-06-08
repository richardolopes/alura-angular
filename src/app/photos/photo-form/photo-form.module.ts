import { NgModule } from '@angular/core';
import { PhotoFormComponent } from './photo-form.component';
import { CommonModule } from '@angular/common';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        VMessageModule,
        RouterModule
    ]
})
export class PhotoFormModule {

}