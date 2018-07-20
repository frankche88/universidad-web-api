import { Component, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { EndPoints } from './config';

@Injectable()

export class ConsumeApiService {

    constructor(
        private _http: HttpClient
    ) { }

    Uploadfile(formData: FormData) {
        return this._http.post<any>(EndPoints.upload, formData);
    }
    
    createAviso(formData: FormData) {
        return this._http.post<any>(EndPoints.newAviso, formData);
    }
    
    updateAviso(formData: FormData) {
        return this._http.post<any>(EndPoints.updateAviso, formData);
    }
    
    
}
