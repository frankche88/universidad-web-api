import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Aviso } from '../models/aviso.model';
import { EndPoints } from './config';

@Injectable()
export class AvisoService {


  private listAvisoUrl = EndPoints.listAviso;
  
  private getAvisotUrl = EndPoints.getAviso;

  constructor(private http: HttpClient) { }

  getAviso(id): Observable<Aviso> {
  
      return this.http.get<Aviso>(this.getAvisotUrl, {
            params: new HttpParams()
                .set('id', id)
        });

  }
  
  editAviso(id): Observable<any> {
      return this.http.get<Aviso>(this.getAvisotUrl + '/' + id);

  }
  

  findAvisos(filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3): Observable<Aviso[]> {
      return this.http.get<Aviso[]>(this.listAvisoUrl, {
            params: new HttpParams()
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        });
  }

  countAvisos(): Observable<number> {
        return this.http.get<number>(EndPoints.countAviso);
  }

  findAviso(id: number) {

      return this.http.get(EndPoints.showHtmlAviso, {responseType: 'text'});
  }


}
