// import React, { useEffect, useState } from "react";
// import CardProposeComponents from "./CardProposeComponents";
// import * as ProductServices from "../services/ProductServices";
// import { useQuery } from "@tanstack/react-query";
// import Row from "react-bootstrap/Row";
// import axios from "axios";
// import {LoadingCardComponent5SP} from "./LoadingCardComponent";

// const ProposeComponents = () => {
//   const imgStorage = localStorage.getItem("img");
//   const imageBase64 = JSON.parse(imgStorage);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     if (!isLoaded) {
//       axios
//         .post("/save", {
//           imageBase64,
//         })
//         .then((res) => {
//           console.log("ok", res);
//         })
//         .catch((err) => {
//           console.log("ERR", err);
//         });
//       setIsLoaded(true);
//     }
//   }, [isLoaded]);

//   const fetchProductAll = async () => {
//     const res = await ProductServices.getAllProduct();
//     return res;
//   };
//   //   const [checkLoad, setCheckLoad] = useState(false);

//   const [result_age, set_result_age] = useState("");
//   const [result_bmi, set_result_bmi] = useState("");
//   const [result_gender, set_result_gender] = useState("");

//   useEffect(() => {
//     const result = fetch("/save").then((response) =>
//       response.json().then((data) => data)
//     );
//     const arrResult = async () => {
//       const arr = await result;
//       console.log("duLieu", arr);
//       set_result_gender(arr[0]);
//       set_result_age(arr[1]);
//       set_result_bmi(arr[2]);
//     };
//     arrResult();
//   }, []);

//   let { isLoading, data: product } = useQuery(["products"], fetchProductAll, {
//     retry: 3,
//     retryDelay: 1000,
//   });
//   console.log("productproduct", product);

//   if (result_gender === "" && result_age === "" && result_bmi === "") {
//     isLoading = true;
//     product = undefined;
//   }

//   console.log("gender", result_gender);
//   console.log("age", result_age);
//   console.log("bmi", result_bmi);

//   let lengthProducts = 8;
//   const arrayProducts = [];
//   for (let i = 1; i <= lengthProducts; i++) {
//     arrayProducts.push(i);
//   }

//   return (
//     <div className="card-propose">
//       {/* <DuDoan /> */}
//       <h2>Sản phẩm đề xuất cho bạn</h2>
//       <img className="img-propose" src={imageBase64} alt="" />

//       {/* <CardProposeComponents /> */}
//       <div className="products">
//         <LoadingCardComponent5SP
//           isLoading={isLoading}
//           arrayProducts={arrayProducts}
//         >
//           <Row>
//             {product?.data?.map((product, index) => {
//               return (
//                 // <span key={index}>
//                 <CardProposeComponents
//                   id={product._id}
//                   key={index}
//                   className="card_Propose"
//                   // countInstock={product.countInstock}
//                   // description={product.description}
//                   image={product.image}
//                   name={product.name}
//                   price={product.price}
//                   // rating={product.rating}
//                   type={product.type}
//                   // discount={product.discount}
//                   // selled={product.selled}
//                   age={product.age}
//                   bmi={product.bmi}
//                   result_age={result_age}
//                   result_bmi={result_bmi}
//                   result_gender={result_gender}
//                 />
//                 // </span>
//               );
//             })}
//           </Row>
//         </LoadingCardComponent5SP>
//       </div>
//     </div>
//   );
// };

// export default ProposeComponents;
