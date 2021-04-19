import IPaymentsPix from "./IPaymentsPix";

export default interface IPaymentPixXpto extends IPaymentsPix{
    connect():string
    generateQrcodeByLocId(token:string, locId: string):string
    generateBilling():any
}