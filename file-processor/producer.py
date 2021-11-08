import pika
import json


class QueueConnection():

    def __init__(self, queueName, host='localhost'):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host))
        self.channel = self.connection.channel()
        self.queueName = queueName
        self.channel.queue_declare(queue=queueName, durable=True)

    def publish_msg(self, pattern: str, data: any):
        self.channel.basic_publish(
            exchange='',
            routing_key=self.queueName,
            body=json.dumps({"pattern": pattern, "data": data}),)

    def listen(self, cb):
        self.channel.basic_consume(queue=self.queueName,
                                   on_message_callback=cb, auto_ack=False)
        self.channel.start_consuming()

    def close_connection(self):
        self.connection.close()
