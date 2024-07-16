import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todos } from '@pipe/app.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Todos
    ],
    exports: [
        Todos
    ]
})
export class PipeModule { }
