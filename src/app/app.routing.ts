import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes
import { AvisoQueryComponent } from './components/avisoQuery.component';
import { AddAvisoComponent } from './components/addAviso.component';
import { ShowHtmlComponent } from './show-html/show-html.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateAvisoComponent } from './components/createAviso.component';
import { ModifyAvisoComponent } from './components/modifyAviso.component';

import {ModifyAvisoArticleComponent} from './components/modifyAvisoArticle.component';

const APPROUTES: Routes = [
    {
        path: '',
        component: AvisoQueryComponent
    },
    {
        path: 'alumnos',
        component: AvisoQueryComponent
    },
    {
        path: '**',
        component: AvisoQueryComponent
    }
];

export const APPROUTINGPROVIDERS: any[] = [];
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APPROUTES); // Modulo
