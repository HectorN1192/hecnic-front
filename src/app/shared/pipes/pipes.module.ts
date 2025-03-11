import { NgModule } from '@angular/core';
import { BooleanPipe } from './BooleanPipe.pipe';
import { EuroPipe } from './EuroPipe.pipe';
import { TypeRequestRetentionPipe } from './TypeRequestRetentionPipe.pipe';

@NgModule({
  declarations: [
    BooleanPipe,
    EuroPipe,
    TypeRequestRetentionPipe
  ],
  imports: [
    
  ],
  exports: [
    BooleanPipe,
    EuroPipe,
    TypeRequestRetentionPipe
  ]
})
export class PipesModule { }
