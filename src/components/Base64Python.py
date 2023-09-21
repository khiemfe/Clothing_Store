# import json
# import localstorage
# from selenium import webdriver
# driver = webdriver.Chrome()
# # storage = LocalStorage(driver)
# # Get the value of the `img` key from localStorage.
# img_storage = window.localstorage.getItem("img")

# # Parse the JSON string.
# image_camera = json.loads(img_storage)

# print(image_camera)
# from selenium import webdriver
# from selenium.webdriver.local_storage import LocalStorage
# # from importlib import import_module

# # LocalStorage = import_module("selenium.webdriver.local_storage", fromlist=["LocalStorage"])
# storage = LocalStorage(webdriver)

# # Get the value of the `img` key from local storage.
# img_storage = storage.getItem("img")

# from selenium import webdriver   # for webdriver

# driver = webdriver.Chrome()
# # Get URL first to load page to run script
# driver.get('http://localhost:3000')
# driver.execute_script("window.localStorage.setItem('img', 'image.jpg');")

# # Refresh the page
# driver.get('http://localhost:3000')

# # Get the value of the 'img' key from local storage.
# value = driver.execute_script("return window.localStorage.getItem('img');")

# # Print the value of the 'img' key from local storage.
# print(value)

# from selenium import webdriver

# class WebstorageTest:
#     @staticmethod
#     def main():
#         driver = webdriver.Firefox()
#         webStorage = driver.execute_script("return window.localStorage")
#         # using local storage
#         localStorage = webStorage
#         # localStorage.setItem("name", "chercher tech")
#         print(localStorage.getItem("img"))
#         # localStorage.removeItem("name")
#         # localStorage.clear()

#         # # using session storage
#         # sessionStorage = driver.execute_script("return window.sessionStorage")
#         # sessionStorage.setItem("name", "chercher tech")
#         # sessionStorage.getItem("name")
#         # sessionStorage.removeItem("name")
#         # sessionStorage.clear()

# if __name__ == "__main__":
#     WebstorageTest.main()

# class LocalStorage: 
#      def get(self, key):
#         return self.driver.execute_script("return window.localStorage.getItem(arguments[0]);", key)

# get('http://localhost:3000', 'img')

# from selenium import webdriver

# wd = webdriver.Chrome()
# wd.get("http://localhost:3000")
# print(wd.execute_script("return localStorage.getItem('img')"))
# wd.execute_script("return localStorage.getItem('img')")