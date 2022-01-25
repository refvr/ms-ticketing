import { Publisher, Subjects, TicketUpdateEvent } from "@refvrorg/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
