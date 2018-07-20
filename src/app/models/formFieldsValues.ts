export class FormFieldsValues {
    public IssuerRuc: string;
    public DocumentType: string;
    public DocumentSerial: string;
    public DocumentNumber: string;
    public IssueDate: string;
    public RecaptchaKey: string;

    constructor() {
        // this.ClearData();
        this.IssueDate = 'dd/MM/yyyy';
    }

    ClearData() {
        this.IssuerRuc = '';
        this.DocumentType = '';
        this.DocumentSerial = '';
        this.DocumentNumber = '';
        this.IssueDate = 'dd/MM/yyyy';
        this.RecaptchaKey = '';
    }
}
