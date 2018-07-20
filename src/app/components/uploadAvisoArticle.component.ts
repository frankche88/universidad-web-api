import { Component, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ConsumeApiService } from "../services/consumeApi.service";
import { ResponsePostModel } from "../models/responsePostModel";
import { LanguageValues } from "../services/languageValues";
import { NgForm } from '@angular/forms';


@Component({
    selector: 'upload-aviso-article',
    templateUrl: '../views/uploadAvisoArticle.html',
    providers: [
        ConsumeApiService
    ]
})
export class UploadAvisoArticleComponent {
    public CurrentSection: string;
    public FileName: string;
    public CheckResetInputfield: boolean;
    public InputFile: any;
    public FinalMessage: string;
    public TitleFinalMessage: string;
    public ValidInputFile: boolean;
    public InputFileChanged: boolean;
    private CurrentFile: File;
    public issueDate1: string;

    public avisosSubject: string;
    public HtmlTextValues: any;

    private responseValues: ResponsePostModel;

    constructor(
        private _consumeApiService: ConsumeApiService
    ) {
        this.CurrentSection = "form";
        this.FileName = "";
        this.issueDate1 = "";
        this.CheckResetInputfield = false;
        this.HtmlTextValues = LanguageValues;
        this.responseValues = new ResponsePostModel();
        this.FinalMessage = "";
        this.TitleFinalMessage = "";
        this.ValidInputFile = false;
        this.InputFileChanged = false;
        this.avisosSubject = 'es';
    }

    ngAfterViewInit() {
     
    }

    sendDataForm() {
        this.CurrentSection = "loadingComponent";
        // new implementation to gives IE and Edge support
        let formData = new FormData();
        //formData.append(this.FileName, this.CurrentFile);
        formData.append('qqfile', this.CurrentFile);
        
        formData.append('issueDate', this.issueDate1);
      
      
        let body = formData;
        // disable help button
        //mostrarBtnAyuda.activarBtnAyuda(false);

        this._consumeApiService.Uploadfile(body).subscribe(
            response => {
                if (response) {
                    this.responseValues = response;
                    this.changeCurrentSection();
                } else {
                    console.log("response doesnt exists ");
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
        this.InputFile = "";
        this.FileName = "";
        this.InputFileChanged = false;
        //mostrarBtnAyuda.activarBtnAyuda(true);

        if (form) {
            form.resetForm();
        }
        

        if (this.CurrentSection != "form") {
            //initTiggers.iniciarTiggers();
            this.CurrentSection = "form";
        }
    }

    OnFileChange(files: any) {
        this.InputFileChanged = true;
        this.CurrentFile = files[0];
        this.FileName = files[0].name;
        this.ValidInputFile = this.inputFileValidation(this.CurrentFile);
    }
    
    DateChange(value: any) {
        this.issueDate1 = value;
    }

    inputFileValidation(file: any) {
        let maxSize = 5242880;  // 5Mb
        if (file && file.size <= maxSize && file.type === "text/html") {
            return true;
        } else {
            return false;
        }
    }

    changeCurrentSection() {
        this.responseValues.message = this.responseValues.message || "";

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
        let finalString = "";
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