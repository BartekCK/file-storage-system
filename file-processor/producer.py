import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='file_queue', durable=True)

channel.basic_publish(
    exchange='',
    routing_key='file_queue',
    body='{"pattern":"delete-file","data":{"name":"Artur"}}',
    properties=pika.BasicProperties(
        delivery_mode=2,  # make message persistent
    ))
print(" [x] Sent")
connection.close()