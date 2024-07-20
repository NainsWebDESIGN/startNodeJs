import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todos, AsObject } from '@pipe/app.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Todos, AsObject
    ],
    exports: [
        Todos, AsObject
    ]
})
export class PipeModule { }
