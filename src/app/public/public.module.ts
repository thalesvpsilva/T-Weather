import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';

import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
    imports: [
    CommonModule,
    PublicRoutingModule,
    LoginComponent,
    NotFoundComponent
]
})
export class PublicModule { }
