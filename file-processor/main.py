import json
import os
from dotenv import load_dotenv
from producer import QueueConnection
load_dotenv()


def process_file(producer: QueueConnection):
    print("PROCESS FILE START")
    # PROCESS FILE
    # ...
    # SEND MSG
    producer.publish_msg("file-processed", "fileLocation")


def delete_file():
    print("Remove file")
    pass


def callback(producer: QueueConnection):

    def func(ch, method, properties, body):
        print("Get new message ...")
        data = json.loads(body.decode())

        switch = {
            'process-file': process_file,
            'delete-file': lambda *args: delete_file()
        }
        switch[data["pattern"]](producer)

        ch.basic_ack(delivery_tag=method.delivery_tag)

    return func


def main():
    producer = QueueConnection(os.environ['RABBIT_MQ_QUEUE_FILE'], host = os.environ['RABBIT_MQ_HOST'])
    consumer = QueueConnection(os.environ['RABBIT_MQ_QUEUE_FILE_PROCESS'], host = os.environ['RABBIT_MQ_HOST'])


    print('File-processor started')
    consumer.listen(callback(producer))


if __name__ == "__main__":
    main()
