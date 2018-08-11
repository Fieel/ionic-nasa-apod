import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { CardLayoutComponent } from './card-layout/card-layout';
import { FullscreenLayoutComponent } from './fullscreen-layout/fullscreen-layout';


@NgModule({
	declarations: [ProgressBarComponent,
    CardLayoutComponent,
    FullscreenLayoutComponent],
	imports: [],
	exports: [ProgressBarComponent,
    CardLayoutComponent,
    FullscreenLayoutComponent]
})
export class ComponentsModule {}
