import { Entity, ResponseDTO } from "@fluyappgo/commons";
import { HttpClient } from "../helpers/httpClient";
import { GenerateTicketDTO } from "../helpers/dtos";

export class ProvidersServices extends HttpClient {

    constructor(headers: any) {
        super(headers);
    }

    public login = (data: any) => {
        return this.instance.post<ResponseDTO>(`${this.baseUrl.msProvider}/api/auth/login`, {
            "username": data.username,
            "password": data.password
        })
    };

    public getName = (data: string) => {
        return this.instance.get<ResponseDTO>(`${this.baseUrl.msProvider}/mv/api/clienteTurno`, {
            params: {
                identificacion: data
            }
        },)
    };


} 

