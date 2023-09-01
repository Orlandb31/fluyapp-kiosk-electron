import { EntityTreeUuid, Service, Ticket } from "@fluyappgo/commons";

export interface GenerateTicketDTO {
    entityTree: EntityTreeUuid,
    ticket: Ticket,
    day?: string;
    hour?: string;
    nextBlock?: number;
}