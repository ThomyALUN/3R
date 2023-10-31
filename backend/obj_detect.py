# from torchvision import models
from PIL import Image
import torch
import cv2

# trash_detect('imageToSave.jpg')
def trash_detect(img, listoftrash, bin_sort, ResNetWeights, model, classes):

    img = cv2.imread(img)
    img = cv2.resize(img, (256,256))
    pill_img = Image.fromarray(img)

    transform = ResNetWeights.transforms()
    img_t = transform(pill_img)

    batch_t = torch.unsqueeze(img_t, 0)
    model.eval()
    out = model(batch_t)

    _, indices = torch.sort(out, descending=True)
    percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
    top10 = [(classes[idx].lower(), percentage[idx].item()) for idx in indices[0][:10]]

    for obj in top10:
        if obj[0] in listoftrash:
            return( bin_sort[ obj[0] ] )
    return("Not Found!")