export default interface IPaymentsPix {
    generateQrcodeByLocId(token:string, locId: string):string
    generateBilling():any
}