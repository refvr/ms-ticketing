import { Publisher, Subjects, TicketCreatedEvent } from "@refvrorg/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
