export class Declaration {
    submittedDate: Date;
    username: string;
    temperature: number;
    hasSymptoms: boolean;
    isCloseContact: boolean;
    constructor(submittedDate: Date, username: string, temperature: number, hasSymptoms: boolean, isCloseContact: boolean) {
        this.submittedDate = submittedDate;
        this.username = username;
        this.temperature = temperature;
        this.hasSymptoms = hasSymptoms;
        this.isCloseContact = isCloseContact;
    }
}