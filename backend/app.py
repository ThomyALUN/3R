from flask import Flask, request
from flask_cors import CORS
from obj_detect import trash_detect
import base64
import numpy as np
from torchvision import models


app = Flask(__name__)
CORS(app)

listoftrash = ["broccoli", "wooden spoon", "band aid", "screw",
                "plastic bag", "toilet tissue, toilet paper, bathroom tissue", 
                "paper towel", "diaper, nappy, napkin", "beer bottle", "cup",
                "cucumber, cuke", "wooden spoon", "water bottle", 
                "pop bottle, soda bottle","packet", "granny smith"]

bin_sort = {
    "broccoli" : "black", 
    "cucumber, cuke":"black",
    "wooden spoon" : "black", 
    "band aid" : "black", 
    "plastic bag" : "black",
    "toilet tissue, toilet paper, bathroom tissue" : "yellow", 
    "paper towel" : "yellow",
    "diaper, nappy, napkin" : "black",
    "beer bottle" : "green",
    "cup" : "black",
    "water bottle": "blue",
    "pop bottle, soda bottle":"blue",
    "packet":"yellow",
    "granny smith":"black",
    "screw":"gray",
    "nail":"gray"
}

ResNetWeights = models.ResNet152_Weights.IMAGENET1K_V2
model = models.resnet152(weights=ResNetWeights)

with open('./imagenet_classes.txt') as f:
    classes = [line.strip() for line in f.readlines()]

@app.route("/", methods=["GET", "POST"])
def trash_class():
    req = request.get_json("image")
    req = req.split(',')[1]
    img_data = base64.b64decode(req)
    image_np = np.fromstring(img_data, dtype=np.uint8)

    with open('imageToSave.jpg', "wb") as fh:
        fh.write(image_np)

    return trash_detect('imageToSave.jpg', listoftrash, bin_sort, ResNetWeights, model, classes)

if __name__ == "__main__":
    app.run(debug=True)