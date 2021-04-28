export default interface PaymentsService {
    generateBilling(total: string, cpf: string, name: string, description:string, date: Date) : void;
}