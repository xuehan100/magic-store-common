import { Subjects } from "./subjects";

export default interface ProductCreatedEvent extends Event {
  subject: Subjects.ProductUpdated;
  data: {
    id: string;
    userId: string;
    description?: string;
    price?: number;
    title?: string;
    discount?: number;
    quantity?: number;
  };
}
