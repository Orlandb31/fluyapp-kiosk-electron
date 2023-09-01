import { Entity, ResponseDTO } from "@fluyappgo/commons";
import axios from "axios";
import { HttpClient } from "../helpers/httpClient";
import { GenerateTicketDTO } from "../helpers/dtos";

export class EntitiesServices extends HttpClient {

    constructor(headers: any) {
        super(headers);
    }

    public getEntity = (data: string) => {
        return this.instance.get<ResponseDTO>(`${this.baseUrl.msEntities}/get-entity-uuid`, {
            params: {
                uuid: data
            }
        })
    };

    public getBranch = (data: string) => {
        return this.instance.get<ResponseDTO>(`${this.baseUrl.msEntities}/get-branch-uuid`, {
            params: {
                uuid: data
            }
        })
    };

    public getDepartments = (data: string) => {
        return this.instance.get<ResponseDTO>(`${this.baseUrl.msEntities}/kiosk-list-departments`, {
            params: {
                uuid: data
            }
        })
    };

    public getServices = (data: string) => {
        return this.instance.get<ResponseDTO>(`${this.baseUrl.msEntities}/kiosk-list-services`, {
            params: {
                uuid: data,
                limit: 1000
            }
        })
    };

    public generateTicket = (data: GenerateTicketDTO) => {
        return this.instance.post<ResponseDTO>(`${this.baseUrl.msMoving}/generate-ticket-sam`, data)
    };

}

