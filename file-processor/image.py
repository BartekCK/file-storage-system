from PIL import Image
import uuid

image = Image.open("./mocks/example.JPG")

half = 0.5
image.thumbnail([int(half * s) for s in image.size])
print(uuid.uuid4())
print(image.title)
image.save("test.jpg")
