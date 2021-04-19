import  fs from 'fs';
import path  from 'path';
import IPaymentPixGerenciaNet from "src/adapters/interface/IPaymentPixGerenciaNet";

export default class PaymentsGerenciaNet implements IPaymentPixGerenciaNet{
    connect(){
        return ''
    }
    generateQrcodeByLocId(token:string, locId: string){
        return ''
    }

    generateBilling(){}

    getCertificate(dirCertificate:string){
        const certificate = fs.readFileSync(path.resolve(__dirname, `${dirCertificate}`))
        return certificate;
    }



}