# import requests

# def get_image():
#   url = "http://localhost:3000/propose"
#   response = requests.get(url)
#   return response.content

# image = get_image()

# with open("image.jpg", "wb") as f:
#   f.write(image)

# import localStoragePy

# def get_image():
#   # Tạo đối tượng localStorage
#   # localStorage = localStoragePy()

#   # Lấy dữ liệu ảnh
#   # image = localStorage.getItem("img")
#   image = localStoragePy.get_image('img')
#   return image

# image = get_image()

# with open("image.jpg", "wb") as f:
#   f.write(image)

# import webstorage

# def get_image():
#   # Tạo đối tượng localStorage
#   localStorage = webstorage.LocalStorage("https://example.com")

#   # Lấy dữ liệu ảnh
#   image = localStorage["my_image"]
  
#   # Lưu trữ dữ liệu ảnh
#   # localStorage["my_image"] = "https://example.com/image.png"
#   return image

# image = get_image()

import requests
from PIL import Image
import io

def get_image(url):
  # Truy cập trang web
  response = requests.get(url)

  # Kiểm tra xem trang web có phản hồi thành công không
  if response.status_code == 200:
    # Tải xuống ảnh
    image = Image.open(io.BytesIO(response.content))
    return image
  else:
    # Trả về lỗi
    raise Exception("Trang web không phản hồi thành công")

image = get_image("https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/cc12d5451bfd9bcbb2b448224bd7f5cc/0/0/000-ADLV-21SS-SSACPB-BLK-002_1.webp")

# Xuất ảnh
image.show()