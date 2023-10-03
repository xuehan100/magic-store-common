import { Subjects } from "./subjects";

export interface ProductCreatedEvent extends Event {
  subject: Subjects.ProductCreated;
  data: {
    id: string;
    description: string;
    price: number;
    title: string;
  };
}
