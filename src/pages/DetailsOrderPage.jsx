import React from "react";
import { useLocation, useParams } from "react-router-dom";
import * as OrderServcie from "../services/OrderServices";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../utils";
import LoadingComponents from "../components/LoadingComponents";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { state } = location;
  console.log("state", state);
  const fetchOrderDetails = async () => {
    const res = await OrderServcie.getDetailsOrder(state?.id, id, state?.token);
    return res?.data;
  };
  const queryOrderDetails = useQuery(["order-details"], fetchOrderDetails);
  const { data: dataOrderDetails, isLoading } = queryOrderDetails;
  console.log("dataOrderDetails", dataOrderDetails);

  return (
    <>
      <div className="order-details">
        <h1
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          Chi tiết đơn hàng
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingComponents isLoading={isLoading} />
        </div>
        {!isLoading && (
          <div className="body">
            <div className="info">
              <div style={{ display: "table" }}>
                <div className="receiver">
                  <h3 className="text">Thông tin người nhận:</h3>
                  <h3>Name: {dataOrderDetails?.shippingAddres?.fullName}</h3>
                  <h3>Phone: {dataOrderDetails?.shippingAddres?.phone}</h3>
                  <h3>Address: {dataOrderDetails?.shippingAddres?.address}</h3>
                </div>
              </div>

              <div style={{ display: "table" }}>
                <div className="time">
                  <h3 className="text">Thời gian đặt hàng: </h3>
                  <h3>
                    {dataOrderDetails?.createdAt?.split("T")[1]?.split(".")[0]}
                  </h3>
                  <h3>
                    {dataOrderDetails?.createdAt?.split("T")[0].split("-")[2]}/
                    {dataOrderDetails?.createdAt?.split("T")[0].split("-")[1]}/
                    {dataOrderDetails?.createdAt?.split("T")[0].split("-")[0]}
                  </h3>
                  <h3>Nhận hàng dự kiến: 3-5 ngày</h3>
                </div>
              </div>

              <div style={{ display: "table" }}>
                <div className="paided">
                  {dataOrderDetails?.isPaid ? (
                    <p style={{ color: "green" }}>Đã thanh toán</p>
                  ) : (
                    <p style={{ color: "red" }}>Chưa thanh toán</p>
                  )}
                  {dataOrderDetails?.DeliveryStatus === "NOT" ? (
                    <p style={{ color: "red" }}>Đơn hàng chưa giao</p>
                  ) : dataOrderDetails?.DeliveryStatus === "YES" ? (
                    <p style={{ color: "yellow" }}>Đơn hàng giao thành công</p>
                  ) : (
                    <p style={{ color: "green" }}>Đơn hàng đang giao</p>
                  )}
                </div>
              </div>
            </div>
            <div className="details">
              <div className="product">
                {dataOrderDetails?.orderItems?.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <img src={item?.image} alt="" />
                      <div className="text">
                        <h3>{item?.name}</h3>
                        <h3>{convertPrice(item?.price)}</h3>
                        <h3>Size: {item?.size}</h3>
                        <h3>Số lượng: {item?.amount}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="price">
                <h3>Sản phẩm: {convertPrice(dataOrderDetails?.itemsPrice)}</h3>
                <h3>
                  Phí ship: {convertPrice(dataOrderDetails?.shippingPrice)}
                </h3>
                <h3 className="total">
                  Tổng tiền: {convertPrice(dataOrderDetails?.totalPrice)}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsOrderPage;
