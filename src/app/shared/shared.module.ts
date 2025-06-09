import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInputComponent } from './components/search-input/search-input.component';
import { CoreModule } from '../core/core.module';


@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SearchInputComponent
    ],
    exports: [
        SearchInputComponent
    ]
})
export class SharedModule { }
