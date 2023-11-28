// import React, { useEffect, useMemo, useState } from "react";
// import { convertPrice } from "../utils";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { orderContant } from "../contant";
// import HeaderComponents from "../components/HeaderComponents";
// import * as CartServices from "../services/CartServices";

// const OrderSuccessPage = () => {
//   const order = useSelector((state) => state.order);
//   const user = useSelector((state) => state.user);
//   const location = useLocation(); //nhận dữ liệu trong state gửi bằng navigate
//   const { state } = location;
//   console.log("state", state);

//   const dispatch = useDispatch();
//   // dispatch(selectedOrder());

//   const fetchOrderCart = async () => {
//     const res = await CartServices.getCartByUserId(
//       user?.id,
//       user?.access_token
//     );
//   };
//   fetchOrderCart();

//   return (
//     <>
//       <HeaderComponents />
//       <h1 style={{ textAlign: "center", marginTop: "50px" }}>
//         Đơn hàng đã đặt thành công
//       </h1>
//       <div className="page-payment">
//         <div className="payment">
//           <div className="method-pay">
//             <p style={{ fontSize: "20px" }}>
//               Phương thức giao hàng:{" "}
//               <span>{orderContant.valueRadioGH[state?.valueRadioGH]}</span>{" "}
//             </p>
//           </div>
//           <div className="method-pay">
//             <p style={{ fontSize: "20px" }}>
//               Phương thức thanh toán:{" "}
//               <span>{orderContant.valueRadioTT[state?.valueRadioTT]}</span>
//             </p>
//           </div>
//           {state?.order?.map((item, index) => {
//             return (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginTop: "10px",
//                 }}
//               >
//                 <img style={{ width: "100px" }} src={item?.image} alt="" />
//                 <div style={{ marginLeft: "10px" }}>
//                   <h3>{item?.name}</h3>
//                   <h3>{convertPrice(item?.price)}</h3>
//                   <p style={{ fontSize: "14px" }}>SL: {item?.amount}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="pay">
//           <div>
//             <h3>Thông tin khách hàng: </h3>
//             <div>
//               <h4>{user?.name}</h4>
//               <h4>{user?.phone}</h4>
//               <h4>{user?.address}</h4>
//             </div>
//           </div>
//           <ul className="pay-list">
//             <li className="pay-item">
//               <h3>Tạm tính: {convertPrice(state?.priceMemo)}</h3>
//               <span></span>
//             </li>
//             <li className="pay-item">
//               <h3>Phí giao hàng: {convertPrice(state?.shippingPrice)}</h3>
//               <span></span>
//             </li>
//             <li className="pay-item">
//               <h3>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</h3>
//               <span style={{ fontWeight: "bold" }}></span>
//             </li>
//           </ul>
//           <button className="pay-btn" onClick={""}>
//             Huỷ
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderSuccessPage;
