import { Component } from '@angular/core';

@Component({
    selector: 'app-validity-query',
    templateUrl: '../views/avisoQuery.html'
})
export class AvisoQueryComponent {
    public avisosSubject: string;

    constructor() {

    }

    OnLanguageChange(language: string) {
        this.avisosSubject = language;

    }
}
