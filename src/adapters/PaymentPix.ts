import PaymentService from "./services/PaymentService";

import  PaymentsItau from "./services/PaymentsXpto";
import  PaymentsGerenciaNet from "./services/PaymentsGerenciaNet";
import ApiGerenciaNet from "src/infra/api/ApiGenrenciaNet";


// const paymentPix = new PaymentService( new PaymentsGerenciaNet(), new ApiGerenciaNet())

// console.log(paymentPix.emitOrder())