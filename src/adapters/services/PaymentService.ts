
import IPaymentsPix from "../interface/IPaymentsPix";
import Api from "src/infra/api/Api";

export default class PaymentService {

    private paymentPix : IPaymentsPix

    constructor(payment: IPaymentsPix){
        this.paymentPix = payment
    }
}