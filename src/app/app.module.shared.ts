import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { ColorPickerModule} from 'ngx-color-picker';
import {NgxWigModule} from 'ngx-wig';




import { MatInputModule, MatTableModule, MatPaginatorModule,
  MatIconModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// Routes
import {ROUTING, APPROUTINGPROVIDERS} from './app.routing';

// Components
import {AppComponent} from './app.component';
import {AvisoQueryComponent} from './components/avisoQuery.component';

import {AvisoTableArticleComponent} from './components/avisoTableArticle.component';
import {AddAvisoComponent} from './components/addAviso.component';

import {UploadAvisoArticleComponent} from './components/uploadAvisoArticle.component';

import { ShowHtmlComponent } from './show-html/show-html.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AvisoService } from './services/aviso.service';


import { KeepHtmlPipe } from './pipes/keep-html.pipe';

// Custom Validators
import {ShowErrorsComponent} from './components/showErrorsComponent';

import {CreateAvisoComponent} from './components/createAviso.component';
import {TemplateAvisoArticleComponent} from './components/templateAvisoArticle.component';

import {ModifyAvisoComponent} from './components/modifyAviso.component';
import {ModifyAvisoArticleComponent} from './components/modifyAvisoArticle.component';

@NgModule({
  declarations: [
    AppComponent,
    AvisoQueryComponent,
    AvisoTableArticleComponent,
    AddAvisoComponent,
    UploadAvisoArticleComponent,
    ShowErrorsComponent,
    ShowHtmlComponent,
    PageNotFoundComponent,
    KeepHtmlPipe,
    CreateAvisoComponent,
    TemplateAvisoArticleComponent,
    ModifyAvisoComponent,
    ModifyAvisoArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    HttpClientModule,
    ROUTING,
    ColorPickerModule,
    NgxWigModule
  ],
  providers: [
    APPROUTINGPROVIDERS,
    AvisoService,
    DatePipe
  ]
})
export class AppModuleShared {
}

