import { Stan } from "node-nats-streaming";
import Event from "./eventBase";

export default abstract class BasePublisher<T extends Event> {
  abstract subject: T["subject"];

  constructor(private client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log("Event published to subject", this.subject);
        resolve();
      });
    });
  }
}
