import React, { useState, useEffect } from "react";
import tf from "@tensorflow/tfjs";
// import { useYolo } from "@tensorflow/tfjs-yolo-v5";

const DuDoan = () => {
//   const [image, setImage] = useState(null);
const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST-CuYY7h0n62jB5fdmfKhrSSYrw7GD9X92HHEGtc&s'
  const [prediction, setPrediction] = useState(null);

  // Khởi tạo mô hình YOLOv5
//   const yolo = useYolo({
//     backend: "tfjs",
//     configPath: "./yolov5/yolov5s.cfg",
//     weightsPath: "./yolov5/yolov5s.weights",
//     labelsPath: "./yolov5/coco.names",
//   });

  // Xử lý khi người dùng tải lên hình ảnh
//   useEffect(() => {
//     const file = document.querySelector("#image").files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       setImage(event.target.result);
//     };

//     reader.readAsDataURL(file);
//   }, []);

  const ageModel = async () => {
    await tf.loadModel("./Age.pt");
  }
  ageModel()

  // Dự đoán tuổi của người trong toàn bộ hình ảnh
  useEffect(async () => {
    if (image) {
    //   const prediction = await ageModel.predict(image);
    //   setPrediction(prediction);
    console.log('hihihihihi')
    }
  }, [image]);

  return (
    <div>
      {/* <img src={image} alt="Image" />
      <h2>Dự đoán tuổi: {prediction}</h2> */}
    </div>
  );
};

export default DuDoan;