import Billing from "../entity/Billing";
import PaymentsService from "../service/PaymentsService";

export default class CreateBilling {
    paymentService: PaymentsService;
    
    constructor(paymentService : PaymentsService){
        this.paymentService = paymentService;
    }

    async execute (total: string, cpf: string, name: string, description:string, date: Date) {

        const billing = await this.paymentService.generateBilling(total, cpf, name, description, date);
        // TODO: chamar repository e armazenar na base em caso de sucesso
        const billingEntity = new Billing(total, cpf, name, description, date);
        return billing;
    }
}