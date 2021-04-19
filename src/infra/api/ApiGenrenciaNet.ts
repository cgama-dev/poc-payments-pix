import Api from "./Api";
import axios , { AxiosInstance, AxiosRequestConfig } from 'axios';
import fs from 'fs';
import path from 'path';
import https from 'https';

export default class ApiGerenciaNet implements Api {
    clientID: string;
    secretID: string;
    apiAuth: AxiosInstance;

    constructor(clientID: string, secretID:string){
        this.clientID = clientID;
        this.secretID = secretID;

        this.connect().then((response)=>{
            this.apiAuth = response
        })
    }

    getCertificate(dirCertificate: string){
        return fs.readFileSync(path.resolve(__dirname, `${dirCertificate}`));
    }

    getAgent(certificate: any){
        const agent = new https.Agent({
            pfx: certificate,
            passphrase: ''
        })
        return agent;
    }

    getAuthByCredentials(){
        const dataCredentials = `${this.clientID}:${this.secretID}`;
        const auth = Buffer.from(dataCredentials).toString('base64');
        return auth;
    }   

    getParamsAuth(){
        const credentials = this.getAuthByCredentials();
        const dirCert = `./../../../certs/${process.env.GN_LOCAL}/${process.env.GN_CERTIFICATE_NAME}`;
        const certificate = this.getCertificate(dirCert);
        const agent = this.getAgent(certificate);

        return {
            credentials,
            agent
        }
    }

    authenticate(){
        
        const {credentials, agent} = this.getParamsAuth();

        return axios({
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
          });
    }

    async connect():Promise<AxiosInstance>{
        const { agent} = this.getParamsAuth();
        const authResponse = await this.authenticate();
        const accessToken = authResponse.data.access_token;

        return axios.create({
            baseURL: process.env.GN_ENDPOINT,
            httpsAgent: agent,
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
            }
        });
    }
}