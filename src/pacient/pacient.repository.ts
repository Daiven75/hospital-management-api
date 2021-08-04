// import { Injectable } from "@nestjs/common";
// import { Pacient } from "src/models/Pacient";

import { Repository } from "typeorm";
import { Pacient } from "./pacient";

// var redis = require("redis");
// var client = redis.createClient({
//     db: 1
// })

// @Injectable()
// export class ProdutoRepository {

//     salvaTeste() {
//         client.set('teste', 'alguma coisa', (err, reply) => {
//             if (err) throw err;
//             console.log(reply);
//         });
//     }

//     buscarTeste() {
//         console.log("passou pelo repository")
//         client.get('teste', (err, reply) => {
//             if (err) throw err;
//             console.log(reply);
//         });
//     }

//     async registerPacient(pacient: Pacient): Promise<Pacient> {
//         console.log("vai salvar o paciente no repositorio!");
//         return client.hset('Pacient', pacient.id_pacient, JSON.stringify(pacient), (err, res) => {
//             if (err) throw err;
//             console.log(res);
//         });
//         // return client.set("Pacient", JSON.stringify(pacient), (err, res) => {
//         //     if (err) throw err;
//         //     console.log(res);
//         // });
//     }

//     findPacientByCpf(cpf: string): Promise<Pacient> {
//         cpf = "8d3de42a-e90a-45bb-983a-0d75c017d386";
//         return client.hget('Pacient', cpf, (err, data) => {
//             if (err) throw err;
//             console.log("dentro da promise: " + data);
//         });
//     }
// }

export class PacientRepository extends Repository<Pacient>{

}