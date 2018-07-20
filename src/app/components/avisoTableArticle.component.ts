import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DataSource} from '@angular/cdk/collections';

import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import {fromEvent} from 'rxjs/observable/fromEvent';



import { Aviso} from '../models/aviso.model';


import { AvisoService } from '../services/aviso.service';

import {AvisosDataSource} from "../services/avisos.datasource";


@Component({
    selector: 'aviso-table-article',
    templateUrl: '../views/avisoTableArticle.html',
    styleUrls: ['../views/avisoTableArticle.css'],
    providers: []
})
export class AvisoTableArticleComponent {
    
    public dataSource = new AvisosDataSource(this.avisoService);
    public displayedColumns = ['id', 'filename', 'fecha', 'actionsColumn'];

    public CurrentSection: string;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('input') input: ElementRef;

    constructor(private avisoService: AvisoService) { 
    
        this.CurrentSection = "form";
    }

    ngOnInit() {

        this.dataSource = new AvisosDataSource(this.avisoService);

        this.dataSource.loadAvisos('', 'asc', 0, 3);
    }

    ngAfterViewInit() {

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;

                    this.loadAvisosPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadAvisosPage())
        )
        .subscribe();

    }

    
    ResetAndGoForm() {
        //TODO: modificar para capturar errores
        this.CurrentSection = "form";
        
    }
    
    edit(id) {
        console.log("editar: " + id);
    }
    
    loadAvisosPage() {
        this.dataSource.loadAvisos(
            this.input.nativeElement.value,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    
}
