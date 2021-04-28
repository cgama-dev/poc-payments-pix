import axios , { AxiosInstance, AxiosRequestConfig } from 'axios';
import fs from 'fs';
import path from 'path';
import https from 'https';
import PaymentsService from 'src/domain/service/PaymentsService';

export default class PaymentsGerenciaNet implements PaymentsService{

    clientID: string;
    secretID: string;
    apiAuth: AxiosInstance;
    keybank: string;

    constructor(){
        this.clientID = `${process.env.GN_CLIENT_ID}`;
        this.secretID = `${process.env.GN_SECRET_ID}`;
        this.keybank = `${process.env.GN_KEY_BANK}`;
    }   

    private readDirCertificate(dirCertificate: string){
        return fs.readFileSync(path.resolve(__dirname, `${dirCertificate}`));
    }

    private getAgent(certificate: any){
        const agent = new https.Agent({
            pfx: certificate,
            passphrase: ''
        })
        return agent;
    }

    private getAuthByCredentials(){
        const dataCredentials = `${this.clientID}:${this.secretID}`;
        const auth = Buffer.from(dataCredentials).toString('base64');
        return auth;
    }   


    private getRequestConfigAuth(authorizationBasic: boolean, accessToken: string = null):AxiosRequestConfig{
        const credentials = this.getAuthByCredentials();
        const dirCert = `./../config/certs/${process.env.GN_LOCAL}/${process.env.GN_CERTIFICATE_NAME}`;
        const certificate = this.readDirCertificate(dirCert);
        const agent = this.getAgent(certificate);

        const configAuthBasic: AxiosRequestConfig = {
            method: 'POST',
            url: `${process.env.GN_BASE_URL}/oauth/token`,
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            httpsAgent: agent,
            data: {
                grant_type: 'client_credentials'
            }
        }

        const configAuthBearer: AxiosRequestConfig = {
            baseURL: process.env.GN_BASE_URL,
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        return authorizationBasic ? configAuthBasic: configAuthBearer;
    }


    private authenticate(){
        return axios(this.getRequestConfigAuth(true, null));
    }

    async connect(){
        try{
            const authResponse = await this.authenticate();
            const accessToken = authResponse.data.access_token;
            const createConnectionPix = axios.create(this.getRequestConfigAuth(false, accessToken))
            return createConnectionPix;
        }catch(e){
            throw new Error("Erro ao connectar na api do PIX");
        }
    }

    async generateBilling(total: string, cpf: string, name: string, description: string, date: Date) {
        const databilling = {
            calendario: {
                expiracao: 3600
            },
            devedor: {
                cpf: cpf,
                nome: name
            },
            valor: {
                original: total
            },
            chave: this.keybank,
            solicitacaoPagador: description
        }
        try {
            this.apiAuth = await this.connect();
            const { data }  = await this.apiAuth.post(`/v2/cob`, databilling);
            return data;
          }catch(e){
            throw new Error(JSON.stringify(e.response.data));
          }
    }

    generateQrcodeByLocId(token: string, locId: string): string {
        return 'a';
    }

}