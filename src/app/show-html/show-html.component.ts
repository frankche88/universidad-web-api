import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import { AvisoService } from '../services/aviso.service';

@Component({
  selector: 'app-show-html',
  templateUrl: './show-html.component.html',
  styleUrls: ['./show-html.component.css']
})
export class ShowHtmlComponent implements OnInit {

    public body: string;
    public id: number;
    private exito: boolean;


  constructor(private avisoService: AvisoService,
    private aRoute: ActivatedRoute, private router: Router) {
    this.exito = false;
  }

  ngOnInit() {

      this.getAviso();
  }

  getAviso(): void {
    this.id = +this.aRoute.snapshot.paramMap.get('id');
    this.avisoService.findAviso(this.id)
    .subscribe(

      body => {
        // Handle result
        this.body = body;
      },
      error => {
          this.router.navigate(['/notfound']);
        console.log( error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }

     );
  }

}
