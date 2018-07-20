


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {Aviso} from "../models/aviso.model";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";

import { AvisoService } from './aviso.service';



export class AvisosDataSource implements DataSource<Aviso> {

    private avisosSubject = new BehaviorSubject<Aviso[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);
    
    public avisosLength: number;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private avisoService: AvisoService) {
        this.avisosLength = 10;
    }

    loadAvisos(filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);
        

        this.avisoService.findAvisos(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(avisos => {
                this.avisosSubject.next(avisos);
                
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Aviso[]> {
        console.log("Connecting data source");
        return this.avisosSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.avisosSubject.complete();
        this.loadingSubject.complete();
    }

}

