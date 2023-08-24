import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInputComponent } from './components/search-input/search-input.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    SearchInputComponent
  ]
})
export class SharedModule { }
