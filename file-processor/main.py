import json
import os
from dotenv import load_dotenv
from producer import QueueConnection
from PIL import Image
load_dotenv()


def process_file(key: str):
    print(f"Process file with key {key}")

    # PROCESS AND SAVE FILE
    image = Image.open(f"../files/unprocessed/{key}")
    half = 0.5
    image.thumbnail([int(half * s) for s in image.size])
    image.save(f"../files/for-share/{key}")

    # SEND MSG
    producer = QueueConnection(
        os.environ['RABBIT_MQ_QUEUE_FILE'], host=os.environ['RABBIT_MQ_HOST'])
    producer.publish_msg("file-processed", key)
    producer.close_connection()


def delete_file(key: str):
    print(f"Remove file with key {key}")
    os.remove(f"../files/unprocessed/{key}")


def callback():

    def func(ch, method, properties, body):
        data = json.loads(body.decode())

        switch = {
            'process-file': process_file,
            'delete-file': delete_file
        }
        switch[data["pattern"]](data["data"])

        ch.basic_ack(delivery_tag=method.delivery_tag)

    return func


def main():
    consumer = QueueConnection(
        os.environ['RABBIT_MQ_QUEUE_FILE_PROCESS'], host=os.environ['RABBIT_MQ_HOST'])

    print('File-processor started')
    consumer.listen(callback())


if __name__ == "__main__":
    main()
