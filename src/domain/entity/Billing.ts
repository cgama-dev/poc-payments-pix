export default class Billing {
    total: string;
    cpf:string;
    name: string;
    description:string;
    date: Date

    constructor(total: string, cpf: string, name: string, description:string, date: Date){
        this.total = total;
        this.cpf = cpf;
        this.name = name;
        this.description = description;
        this.date = date;
    }
}