import { Component, ViewChild, Input, SimpleChanges, OnInit  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ConsumeApiService } from "../services/consumeApi.service";
import { ResponsePostModel } from "../models/responsePostModel";
import { LanguageValues } from "../services/languageValues";

import { AvisoService } from '../services/aviso.service';

import { NgForm } from '@angular/forms';


@Component({
    selector: 'aviso-modify-article',
    templateUrl: '../views/modifyAvisoArticle.html',
    providers: [
        ConsumeApiService
    ]
})
export class ModifyAvisoArticleComponent implements OnInit {

    public id: number;
    public CurrentSection: string;
    public txtUrlBackground: string;
    public CheckResetInputfield: boolean;
    public FinalMessage: string;
    public TitleFinalMessage: string;
    public issueDate1: string;
    public txtCuerpoAviso: string;
    public colorCuerpo: string;
    public txtCabeceraAviso: string;
    public colorCabecera: string;

    public avisosSubject: string;
    public HtmlTextValues: any;

    private responseValues: ResponsePostModel;

    constructor(
        private _consumeApiService: ConsumeApiService,
        private _avisoApiService: AvisoService,
        public datepipe: DatePipe,
        private aRoute: ActivatedRoute,
        private router: Router
    ) {
        this.CurrentSection = "form";
        this.issueDate1 = '';
        this.txtUrlBackground = '';
        this.txtCuerpoAviso = '';
        this.colorCuerpo = "#184ab2ff";
        this.txtCabeceraAviso = '';
        this.colorCabecera = "#18b219ff";
        this.CheckResetInputfield = false;
        this.HtmlTextValues = LanguageValues;
        this.responseValues = new ResponsePostModel();
        this.FinalMessage = '';
        this.TitleFinalMessage = '';
        this.avisosSubject = 'es';
    }

    ngOnInit() {

      this.getAviso();
    }

    getAviso(): void {
    this.id = +this.aRoute.snapshot.paramMap.get('id');

    this._avisoApiService.editAviso(this.id)
      .subscribe(

        aviso => {
        // Handle result

          this.issueDate1 = this.datepipe.transform(aviso.fechaAviso, 'dd/MM/yyyy'); //new Date (aviso.fechaAviso).toDateString();
          this.txtCuerpoAviso = aviso.cuerpoAviso;
          this.colorCuerpo = aviso.colorCuerpo;
          this.txtCabeceraAviso = aviso.cabeceraAviso;
          this.colorCabecera = aviso.colorCabecera;
          this.txtUrlBackground = aviso.urlBackground;

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


    sendDataForm() {
        this.CurrentSection = "loadingComponent";
        // new implementation to gives IE and Edge support
        let formData = new FormData();

        formData.append('id', this.id + "");
        
        formData.append('issueDate', this.issueDate1);

        formData.append('colorCabecera', this.colorCabecera);
        formData.append('cabeceraAviso', this.txtCabeceraAviso);
        
        formData.append('urlBackground', this.txtUrlBackground);

        formData.append('colorCuerpo', this.colorCuerpo);
        formData.append('cuerpoAviso', this.txtCuerpoAviso);

        let body = formData;

        this._consumeApiService.updateAviso(body).subscribe(
            response => {
                if (response) {
                    this.responseValues = response;
                    this.changeCurrentSection();
                } else {

                    this.CurrentSection = "validityQueryFail";
                }
            },
            error => {
                console.log("http error: " + <any>error);
                this.CurrentSection = "validityQueryError";
            }
        );
    }

    OnSubmit() {
        this.sendDataForm();
    }

    ResetAndGoForm(form: NgForm) {

        if (form) {
            form.resetForm();
        }
        

        if (this.CurrentSection != "form") {
            //initTiggers.iniciarTiggers();
            this.CurrentSection = "form";
        }
    }

    
    
    DateChange(value: any) {
        this.issueDate1 = value;
    }

    

    changeCurrentSection() {
        this.responseValues.message = this.responseValues.message || '';

        switch (this.responseValues.message) {
            case "msg_accepted":
                this.FinalMessage = this.checkFinalMessageParameters(this.HtmlTextValues[this.responseValues.message]);
                this.TitleFinalMessage = this.HtmlTextValues[("msg_title_" + this.responseValues.message)];
                this.CurrentSection = "validityQuerySuccess";
                break;
            case "msg_rejected":
                this.FinalMessage = this.checkFinalMessageParameters(this.HtmlTextValues[this.responseValues.message]);
                this.TitleFinalMessage = this.HtmlTextValues[("msg_title_" + this.responseValues.message)];
                this.CurrentSection = "validityQueryFail";
                break;
            case "msg_Error":
                this.FinalMessage = this.checkFinalMessageParameters(this.HtmlTextValues[this.responseValues.message]);
                this.TitleFinalMessage = this.HtmlTextValues[("msg_title_" + this.responseValues.message)];
                this.CurrentSection = "validityQueryError";
                break;
            default:
                this.FinalMessage = this.HtmlTextValues["val_quer_art_msg_error"];
                this.TitleFinalMessage = this.HtmlTextValues["msg_title_msg_Error"];
                this.CurrentSection = "validityQueryError";
                break
        }

    }

    checkFinalMessageParameters(message: string) {
        let finalString = '';
        if (message.indexOf("{0}") != -1) {
            let tempString = this.responseValues.parameters[0];

            if (this.responseValues.message == "msg_008" && this.responseValues.parameters[0].toUpperCase() == "ACCEPTED") {
                tempString = this.HtmlTextValues["msg_accepted_fix"];
            } else if (this.responseValues.message == "msg_008" && this.responseValues.parameters[0].toUpperCase() == "REJECTED") {
                tempString = this.HtmlTextValues["msg_rejected_fix"];
            }
            message = message.replace("{0}", tempString);
        }
        if (message.indexOf("{1}") != -1) {
            message = message.replace("{1}", this.responseValues.parameters[1]);
        }
        finalString = message;
        return finalString;
    }
}
