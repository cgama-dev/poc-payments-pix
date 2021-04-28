import PaymentsService from "src/domain/service/PaymentsService";
import CreateBilling from "src/domain/usecase/CreateBilling";

export default class PaymentController {

    paymentService: PaymentsService;
    getBilling: CreateBilling;

    constructor(paymentService: PaymentsService ){
        this.paymentService = paymentService;
        this.getBilling = new CreateBilling(paymentService);
    }

    async createBilling (total: string, cpf: string, name: string, description:string, date: Date) {
        const billing = this.getBilling.execute(total, cpf, name, description, date);
        return billing;
    }
}