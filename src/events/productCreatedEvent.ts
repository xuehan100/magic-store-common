import { Subjects } from "./subjects";

export default interface ProductCreatedEvent extends Event {
  subject: Subjects.ProductCreated;
  data: {
    id: string;
    description: string;
    price: number;
    title: string;
  };
}
