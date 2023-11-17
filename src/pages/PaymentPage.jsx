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

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [formUpdate] = Form.useForm();
  const [payment, setPayment] = useState("later_money");

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected.reduce((total, cur) => {
      return total + cur?.price * cur?.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 100) {
      return 10;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

  const handleBuy = () => {};

  const [valueRadio, setValueRadio] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValueRadio(e.target.value);
  };

  const mutationAddOrder = useMutationHook((data) => {
    console.log("dataUpdate: ", data);
    const { access_token, ...rest } = data;
    const res = OrderServcie.createOrder(access_token, { ...rest }); //rest or {...rest}
    console.log("resssss", res);
    return res;
  });

  const {
    isLoading: isLoadingAddOrder,
    data: dataAddOrder,
    isSuccess: isSuccessAddOrder,
    isError: isErrorAddOrder,
  } = mutationAddOrder;

  useEffect(() => {
    if (isSuccessAddOrder && dataAddOrder?.status === "OK") {
      success();
    } else if (isErrorAddOrder) {
      error();
    }
  }, [isSuccessAddOrder, isErrorAddOrder]);

  const [stateUserDetailsUpdate, setStateUserDetailsUpdate] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    formUpdate.setFieldsValue(stateUserDetailsUpdate);
  }, [formUpdate, stateUserDetailsUpdate]);

  const mutationUpdate = useMutationHook((data) => {
    console.log("dataUpdate: ", data);
    const { id, access_token, ...rest } = data;
    const res = UserServcie.updateUser(id, rest, access_token);
    console.log("resssss", res);
    return res;
  });
  const {
    isLoading: isLoadingUpdate,
    data: dataUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
  } = mutationUpdate;

  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === "OK") {
      success();
      setIsOpenModalUpdate(false);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isErrorUpdate) {
      error();
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  const handleOnchangeDetailsUpdate = (e) => {
    setStateUserDetailsUpdate({
      ...stateUserDetailsUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetDetailsUser = async (id, token) => {
    // setIsLoadingUpdate(true);
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserServcie.getDetailsUser(id, token);
    console.log("res?.data", res);
    // setIsLoadingUpdate(false);
    dispatch(
      updateUser({
        ...res?.data,
        name: stateUserDetailsUpdate?.name,
        phone: stateUserDetailsUpdate?.phone,
        address: stateUserDetailsUpdate?.address,
        access_token: token,
        refreshToken,
      })
    );
  };

  useEffect(() => {
    setStateUserDetailsUpdate({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
    });
  }, [user]);

  const handleUpdate = () => {
    mutationUpdate.mutate({
      id: user?.id,
      name: stateUserDetailsUpdate?.name,
      phone: stateUserDetailsUpdate?.phone,
      address: stateUserDetailsUpdate?.address,
      access_token: user?.access_token,
    });
  };

  console.log("order", order);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo && //
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        phone: user?.phone,
        address: user?.address,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };

  return (
    <>
      <h1>Thanh toán</h1>
      <div>
        <div>
          <h3>Chọn phương thức giao hàng</h3>
          <Radio.Group onChange={onChange} value={valueRadio}>
            <div>
              <Radio value={"GHTK"}>A</Radio>
              <h4>GHTK</h4>
            </div>
            <div>
              <Radio value={"GHN"}>B</Radio>
              <h4>GHN</h4>
            </div>
          </Radio.Group>
        </div>
        <div>
          <h3>Chọn phương thức thanh toán</h3>
          <div>
            <input type="radio" />
            <h4>Thanh toán khi nhận hàng</h4>
          </div>
        </div>
      </div>
      <div className="pay">
        <h5>Thay đổi địa chỉ giao hàng</h5>
        <ul className="pay-list">
          <li className="pay-item">
            <h3>Tạm tính:</h3>
            <span>{convertPrice(priceMemo)}</span>
          </li>
          <li className="pay-item">
            <h3>Phí giao hàng:</h3>
            <span>{convertPrice(diliveryPriceMemo)}</span>
          </li>
          <li className="pay-item">
            <h3>Tổng tiền:</h3>
            <span style={{ fontWeight: "bold" }}>
              {convertPrice(totalPriceMemo)}
            </span>
          </li>
        </ul>
        <button className="pay-btn" onClick={handleAddOrder}>
          Đặt hàng
        </button>
      </div>
      <Modal
        show={isOpenModalUpdate}
        onHide={() => {
          setIsOpenModalUpdate(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centeredxw
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Chỉnh sửa người dùng
          </Modal.Title>
        </Modal.Header>
        <LoadingUpdateComponent isLoading={false}>
          <ModelUpdateUserComponent
            stateUser={stateUserDetailsUpdate}
            form={formUpdate}
            handleOnchange={handleOnchangeDetailsUpdate}
            onFinish={handleUpdate}
            // isLoading={isLoading}
            title="Update"
          />
        </LoadingUpdateComponent>
      </Modal>
    </>
  );
};

export default PaymentPage;
