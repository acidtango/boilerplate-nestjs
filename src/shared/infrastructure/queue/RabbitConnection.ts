import amqplib from 'amqplib'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RabbitConnection {
  private connection?: amqplib.Connection

  constructor(private readonly uri: string) {}

  async connect() {
    this.connection = await amqplib.connect(this.uri)
  }

  async close() {
    await this.connection?.close()
  }

  async createChannel(): Promise<amqplib.Channel> {
    if (!this.connection) {
      throw new Error('RabbitMQ connection not initialized')
    }

    return this.connection.createChannel()
  }
}
