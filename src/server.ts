import express from 'express';
import env from 'dotenv';
import path from 'path';
import ApiGerenciaNet from './infra/api/ApiGenrenciaNet';

const config = env.config({ path: path.resolve(__dirname, './../env/producao.env') })

const gerenciaNet =  new ApiGerenciaNet(`${process.env.GN_CLIENT_ID}`, `${process.env.GN_SECRET_ID}`);


// gerenciaNet.connect().then((result)=>{
//     console.log(result)
// })




const app = express()

app.listen(2000, () => console.log('aaaaa'))
