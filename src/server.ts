import express from 'express';
import env from 'dotenv';
import path from 'path';
import cors  from 'cors';
import PaymentController from './controller/PaymentController';
import PaymentsGerenciaNet from './gateways/pix/services/PaymentsGerenciaNet';
import PaymentsXpto from './gateways/pix/services/PaymentsXpto';
env.config({ path: path.resolve(__dirname, './../env/producao.env') });

const app = express();

app.use(cors())
app.use(express.json())

app.post('/billing', async function(req, res){
    const {total, cpf, name, description } = req.body;

    try{
        //Passa via construtor o provider de pagamento
        //Ex: PaymentsXpto()
        const paymentPix = new PaymentController(new PaymentsGerenciaNet());
        const biiling = await paymentPix.createBilling(total, cpf, name, description, new Date('2021-04-28'));
        res.status(200).json(biiling);
    }catch(e){
        res.status(400).json({
            menssage: 'Ops! Ocorreu algum erro', 
            error: JSON.parse(e.message)
        });
    }
})

app.listen(2000, () => console.log('API Payments PIX'));
