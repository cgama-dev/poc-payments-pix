import PaymentsService from "src/domain/service/PaymentsService";

export default class PaymentsXpto implements PaymentsService{

    async generateBilling(total: string, cpf: string, name: string, description: string, date: Date){
        return 'Cobrança gerada pela API do banco XPTO'
    }
}