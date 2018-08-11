import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { CardLayoutComponent } from './card-layout/card-layout';
import { FullscreenLayoutComponent } from './fullscreen-layout/fullscreen-layout';
import { ListComponent } from './list/list';


@NgModule({
	declarations: [ProgressBarComponent,
    CardLayoutComponent,
    FullscreenLayoutComponent,
    ListComponent],
	imports: [],
	exports: [ProgressBarComponent,
    CardLayoutComponent,
    FullscreenLayoutComponent,
    ListComponent]
})
export class ComponentsModule {}
