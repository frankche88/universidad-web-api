export class FilePost {
    public FileXml: string;
    public RecaptchaKey: string;

    constructor() {
        // this.ClearData();
    }

    ClearData() {
        this.FileXml = '';
        this.RecaptchaKey = '';
    }
}
