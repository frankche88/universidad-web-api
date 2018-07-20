import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import { LanguageValues } from '../services/languageValues';

@Component({
    selector: 'show-errors',
    templateUrl: '../views/showErrors.html'
})
export class ShowErrorsComponent {

    private static readonly errorMessages: any = {
        'receiveridnumber': (params: any) => params.message,
        'documentserial': (params: any) => params.message,
        'documentnumber': (params: any) => params.message
        //'issuedate': (params: any) => params.message,
        //'totalamount': (params: any) => params.message
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    @Input("Language") avisosSubject: string;
    public HtmlTextValues: any = LanguageValues;

    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field]));
    }

    private getMessage(type: string, params: any) {
        return ShowErrorsComponent.errorMessages[type](params);
    }
}
