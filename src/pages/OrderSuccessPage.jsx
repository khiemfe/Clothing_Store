import React, { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "antd";
import * as OrderServcie from "../services/OrderServices";
import { useMutationHook } from "../hooks/useMutationHook";
import * as UserServcie from "../services/userServices";
import { updateUser } from "../redux/slices/userSlice";
import Modal from "react-bootstrap/Modal";
import { Form } from "antd";
import LoadingUpdateComponent from "../components/LoadingUpdateComponent";
import ModelUpdateUserComponent from "../components/ModelUpdateUserComponent";
import { success, error, warning } from "../components/Message";
import { useLocation } from "react-router-dom";
import { orderContant } from "../contant";

const OrderSuccessPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const location = useLocation(); //nhận dữ liệu trong state gửi bằng navigate
  const { state } = location;
  console.log("state", state);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Đơn hàng đã đặt thành công
      </h1>
      <div className="page-payment">
        <div className="payment">
          <div className="method-pay">
            <h3>Phương thức giao hàng</h3>
            <span>{orderContant.valueRadioGH[state?.valueRadioGH]}</span>
          </div>
          <div className="method-pay">
            <h3>Phương thức thanh toán</h3>
            <span>{orderContant.valueRadioTT[state?.valueRadioTT]}</span>
          </div>
        </div>
        <div className="pay">
          <div>
            <h3>Thông tin khách hàng: </h3>
            <div>
              <h4>{user?.name}</h4>
              <h4>{user?.phone}</h4>
              <h4>{user?.address}</h4>
            </div>
          </div>
          <ul className="pay-list">
            <li className="pay-item">
              <h3>Tạm tính:</h3>
              <span></span>
            </li>
            <li className="pay-item">
              <h3>Phí giao hàng:</h3>
              <span></span>
            </li>
            <li className="pay-item">
              <h3>Tổng tiền:</h3>
              <span style={{ fontWeight: "bold" }}></span>
            </li>
          </ul>
          <button className="pay-btn" onClick={""}>
            Huỷ
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
