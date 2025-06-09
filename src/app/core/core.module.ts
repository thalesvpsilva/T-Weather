import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        HeaderComponent
    ],
    exports: [
        HeaderComponent,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})
export class CoreModule { }
