import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule} from 'ngx-color-picker';
import {NgxWigModule} from 'ngx-wig';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared,
        FormsModule,
        ColorPickerModule,
        NgxWigModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ],
    declarations: []
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
