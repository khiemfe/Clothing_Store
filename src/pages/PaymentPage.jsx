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
import { useLocation, useNavigate } from "react-router-dom";
import * as CartServices from "../services/CartServices";
import { useQuery } from "@tanstack/react-query";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [formUpdate] = Form.useForm();
  const [valueRadioGH, setValueRadioGH] = useState("GHTK");
  const [valueRadioTT, setValueRadioTT] = useState("later_money");
  const navigate = useNavigate();

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected.reduce((total, cur) => {
      return total + cur?.price * cur?.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo === 0 || priceMemo >= 800) {
      return 0;
    }
    if (priceMemo >= 500) {
      return 10;
    } else {
      return 20;
    }
  }, [priceMemo]);

  const [shippingPrice, setShipingPrice] = useState(diliveryPriceMemo);
  useEffect(() => {
    if (valueRadioGH === "GHN") {
      setShipingPrice((prev) => prev + 5);
    } else {
      setShipingPrice(diliveryPriceMemo);
    }
  }, [valueRadioGH]);
  console.log("shippingPricee", shippingPrice);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(shippingPrice);
  }, [priceMemo, shippingPrice]);

  const handleBuy = () => {};

  const onChangeGH = (e) => {
    console.log("radio checked", e.target.value);
    setValueRadioGH(e.target.value);
  };

  const onChangeTT = (e) => {
    console.log("radio checked", e.target.value);
    setValueRadioTT(e.target.value);
  };

  const mutationAddOrder = useMutationHook((data) => {
    console.log("dataUpdate: ", data);
    const { user: userId, token, ...rest } = data;
    console.log("token", token);
    console.log("rest", rest);
    const res = OrderServcie.createOrder(userId, token, { ...rest }); //rest or {...rest}
    console.log("resssss", res);
    return res;
  });

  const {
    isLoading: isLoadingAddOrder,
    data: dataAddOrder,
    isSuccess: isSuccessAddOrder,
    isError: isErrorAddOrder,
  } = mutationAddOrder;

  const mutationDeleteMany = useMutationHook((data) => {
    const { token, ...ids } = data;
    const res = CartServices.deleteManyCart(ids, token);
    return res;
  });

  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;

  // const location = useLocation();
  // const { state } = location;
  // console.log('state', state)

  // const fetchOrderCart = async () => {
  //   const res = await CartServices.getCartByUserId(state?.id, state?.token);
  //   return res?.data;
  // };
  // const queryCart = useQuery(["cart"], fetchOrderCart);

  useEffect(() => {
    if (isSuccessAddOrder && dataAddOrder?.status === "OK") {
      success();
      const arrayOrdered = []; //lấy id của các sản phẩm mua để remove khỏi giỏ hàng
      order?.orderItemsSelected?.forEach((e) => {
        arrayOrdered.push(e._id);
      });
      console.log("arrayOrdered", arrayOrdered);
      mutationDeleteMany.mutate(
        { ids: arrayOrdered, token: user?.access_token },
        // {
        //   onSettled: () => {
        //     queryCart.refetch();
        //   },
        // }
      );
      // dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      navigate("/orderSuccess", {
        state: {
          // chuyển dữ liệu khi create success qua
          order: order?.orderItemsSelected,
          priceMemo,
          shippingPrice,
          totalPriceMemo,
          valueRadioGH,
          valueRadioTT,
        },
      });
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

  const openModalUpdata = () => {
    setIsOpenModalUpdate(true);
  };

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

  console.log("orderedd", order);

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        phone: user?.phone,
        address: user?.address,
        paymentMethod: valueRadioTT,
        itemsPrice: priceMemo,
        shippingPrice: shippingPrice,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Thanh toán</h1>
      <div className="page-payment">
        <div className="payment">
          <div className="method-pay">
            <h3>Chọn phương thức giao hàng</h3>
            <Radio.Group onChange={onChangeGH} value={valueRadioGH}>
              <div className="radio-text">
                <Radio value={"GHTK"}></Radio>
                <h4>GHTK</h4>
              </div>
              <div className="radio-text">
                <Radio value={"GHN"}></Radio>
                <h4>GHN</h4>
              </div>
            </Radio.Group>
          </div>
          <div className="method-pay">
            <h3>Chọn phương thức thanh toán</h3>
            <Radio.Group onChange={onChangeTT} value={valueRadioTT}>
              <div className="radio-text">
                <Radio value={"later_money"}></Radio>
                <h4>Thanh toán khi nhận hàng</h4>
              </div>
            </Radio.Group>
          </div>
        </div>
        <div className="pay">
          <div>
            <h3>Thông tin khách hàng: </h3>
            <div>
              <h4>{user?.name}</h4>
              <h4>{user?.phone}</h4>
              <h4>{user?.address}</h4>
              <p
                onClick={openModalUpdata}
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Thay đổi
              </p>
            </div>
          </div>
          <ul className="pay-list">
            <li className="pay-item">
              <h3>Tạm tính:</h3>
              <span>{convertPrice(priceMemo)}</span>
            </li>
            <li className="pay-item">
              <h3>Phí giao hàng:</h3>
              <span>{convertPrice(shippingPrice)}</span>
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
              isLoading={isLoadingUpdate}
              title="Update"
            />
          </LoadingUpdateComponent>
        </Modal>
      </div>
    </>
  );
};

export default PaymentPage;
