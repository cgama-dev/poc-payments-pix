import IPaymentsPix from "src/adapters/interface/IPaymentsPix";

export default class PaymentsXpto implements IPaymentsPix{
    generateBilling(){
        return 'Ordem gerada pelo Pix Itau'
    }
    generateQrcodeByLocId(token:string, locId: string){
        return ''
    }
}