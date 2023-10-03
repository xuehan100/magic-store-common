import { Message, Stan, SubscriptionOptions } from "node-nats-streaming";
import Event from "./baseEvent";

export default abstract class BaseListener<T extends Event> {
  // name of the channel the listner is going to listen
  abstract subject: T["subject"];
  // name of the queue group this listener has to ack a message
  abstract queueGroupName: string;
  // function to run when the message is received
  abstract onMessage(data: T["data"], msg: Message): void;
  // number of seconds this listener has to ack a message
  // protected means the subclass can define it if it wants to
  protected ackWait = 5 * 1000;

  constructor(private client: Stan) {
    this.client = client;
  }

  // default subscription options
  subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen(): void {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }
  // helper function to parse message
  parseMessage(msg: Message): JSON {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
