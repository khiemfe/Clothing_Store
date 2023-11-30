import React, { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { Button, Radio } from "antd";
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
import * as PaymentServices from "../services/PaymentServices";
import { useQuery } from "@tanstack/react-query";
// import { PayPalButton } from "react-paypal-button-v2";
import HeaderComponents from "../components/HeaderComponents";
import LoadingComponents from "../components/LoadingComponents";
import { Toaster } from "react-hot-toast";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [formUpdate] = Form.useForm();
  const [valueRadioGH, setValueRadioGH] = useState("GHTK");
  const [valueRadioTT, setValueRadioTT] = useState("later_money");
  const navigate = useNavigate();

  console.log("orderr", order);

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
    const { userId, token, ...ids } = data;
    const res = CartServices.deleteManyCart(userId, ids, token);
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

  // const [successModel, setSuccessModel] = useState(false);
  useEffect(() => {
    if (isSuccessAddOrder && dataAddOrder?.status === "OK") {
      success("Bạn đã đặt hàng thành công");
      const arrayOrdered = []; //lấy id của các sản phẩm mua để remove khỏi giỏ hàng
      order?.orderItemsSelected?.forEach((e) => {
        arrayOrdered.push(e._id);
      });
      console.log("arrayOrdered", arrayOrdered);
      mutationDeleteMany.mutate(
        { userId: user?.id, ids: arrayOrdered, token: user?.access_token }
        // {
        //   onSettled: () => {
        //     queryCart.refetch();
        //   },
        // }
      );
      setTimeout(() => {
        navigate("/my-order", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
      }, 0);
      // setSuccessModel(true);

      // dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      // navigate("/orderSuccess", {
      //   state: {
      //     // chuyển dữ liệu khi create success qua
      //     order: order?.orderItemsSelected,
      //     priceMemo,
      //     shippingPrice,
      //     totalPriceMemo,
      //     valueRadioGH,
      //     valueRadioTT,
      //   },
      // });
    } else if (isErrorAddOrder) {
      error("Bạn đã đặt hàng thất bại");

      console.log("loiii");
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
      success("Bạn đã cập nhật thông tin thành công");
      setIsOpenModalUpdate(false);
      setIsPhoneNumber(true);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isErrorUpdate) {
      error("Bạn đã cập nhật thông tin thất bại");
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
    if (e.target.name === "phone") {
      setIsPhoneNumber(true);
    }
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

  const [isPhoneNumber, setIsPhoneNumber] = useState(true);

  const handleUpdate = () => {
    setIsPhoneNumber(stateUserDetailsUpdate?.phone.match(/^[0-9]{10}$/));
    if (isPhoneNumber?.length === 1) {
      mutationUpdate.mutate({
        id: user?.id,
        name: stateUserDetailsUpdate?.name,
        phone: stateUserDetailsUpdate?.phone,
        address: stateUserDetailsUpdate?.address,
        access_token: user?.access_token,
      });
    }
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
      user?.id &&
      user?.email
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
        email: user?.email,
      });
    }
  };

  const [sdkReady, setSdkReady] = useState(false); //set xem nó đã có hay chưa
  const addPaypalScript = async () => {
    const { data } = await PaymentServices.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript"; //đặt type là js
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true; // tránh bất đồng bộ
    script.onload = () => {
      //đang load
      setSdkReady(true);
    };
    document.body.appendChild(script);
    console.log("datapaypal", data);
  };

  useEffect(() => {
    if (!window.paypal) {
      //nếu chưa có giao diện paypal
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = (details, data) => {
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
      isPaid: true,
      paidAt: details.update_time,
      email: user?.email,
    });
    console.log("details", details, data);

    const arrayOrdered = []; //lấy id của các sản phẩm mua để remove khỏi giỏ hàng
    order?.orderItemsSelected?.forEach((e) => {
      arrayOrdered.push(e._id);
    });
    console.log("arrayOrdered", arrayOrdered);
    mutationDeleteMany.mutate(
      { ids: arrayOrdered, token: user?.access_token }
      // {
      //   onSettled: () => {
      //     queryCart.refetch();
      //   },
      // }
    );
  };

  const pricePaypal = totalPriceMemo / 23;

  return (
    <>
      <Toaster />
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          textTransform: "uppercase",
        }}
      >
        Thanh toán
      </h1>
      <div className="page-payment">
        <div className="payment">
          <div className="pay-radio">
            <div className="method-pay">
              <h3>Chọn phương thức giao hàng:</h3>
              <Radio.Group onChange={onChangeGH} value={valueRadioGH}>
                <div className="radio-text">
                  <Radio value={"GHTK"}></Radio>
                  <h4>Giao hàng tiết kiệm</h4>
                </div>
                <div className="radio-text">
                  <Radio value={"GHN"}></Radio>
                  <h4>Giao hàng nhanh</h4>
                </div>
              </Radio.Group>
            </div>
            <div className="method-pay">
              <h3>Chọn phương thức thanh toán:</h3>
              <Radio.Group onChange={onChangeTT} value={valueRadioTT}>
                <div className="radio-text">
                  <Radio value={"later_money"}></Radio>
                  <h4>Thanh toán khi nhận hàng</h4>
                </div>
                <div className="radio-text">
                  <Radio value={"paypal"}></Radio>
                  <h4>Thanh toán bằng Paypal</h4>
                </div>
              </Radio.Group>
            </div>
          </div>
          <div className="pay-address">
            <h3>Địa chỉ giao hàng: </h3>
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
            <div className="pay-list">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div className="pay-item">
                  <p>Name: </p>
                  <span>{user?.name}</span>
                </div>
                <div className="pay-item">
                  <p>Phone: </p>
                  <span>{user?.phone}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="pay-item">
                  <p>Address: </p>
                  <span>{user?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pay">
          <div className="pay-product">
            <h3>Sản phẩm: </h3>
            {order?.orderItemsSelected?.map((item, index) => {
              return (
                <div className="product-item">
                  <img
                    style={{ width: 100, height: 100 }}
                    src={item.image}
                    alt=""
                  />
                  <div style={{ marginLeft: 20 }}>
                    <p className="item-text">{item?.name}</p>
                    <p className="item-text">{convertPrice(item?.price)}</p>
                    <p className="item-text">SL: {item?.amount}</p>
                    <p className="item-text">Size: {item?.size}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ width: "50%" }}>
            <p style={{ color: "red", fontSize: 14 }}>
              {mutationAddOrder?.error?.response?.data?.message}
            </p>
            <div className="ok-pay">
              <ul className="pay-list">
                <li className="pay-item">
                  <h3>Sản phẩm:</h3>
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

              {valueRadioTT === "paypal" && sdkReady ? (
                // <div className="paypal">
                //   <PayPalButton
                //     amount={Number(pricePaypal.toFixed(1))} // 20.22 là ko đc (nó không vào onError nhưng cũng không onSuccess, mà vẫn bị trừ tiền)
                //     // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                //     onSuccess={onSuccessPaypal}
                //     onError={() => {
                //       alert("Lỗi Paypal");
                //     }}
                //   />
                // </div>
                <></>
              ) : (
                <div>
                  <div>
                    <LoadingComponents isLoading={isLoadingAddOrder} />
                  </div>
                  <button className="pay-btn" onClick={handleAddOrder}>
                    Đặt hàng
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          show={isOpenModalUpdate}
          onHide={() => {
            setIsOpenModalUpdate(false);
            setIsPhoneNumber(true);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centeredxw
          style={{ marginTop: 100 }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Chỉnh sửa thông tin giao hàng
            </Modal.Title>
          </Modal.Header>
          <ModelUpdateUserComponent
            stateUser={stateUserDetailsUpdate}
            form={formUpdate}
            handleOnchange={handleOnchangeDetailsUpdate}
            onFinish={handleUpdate}
            isLoading={isLoadingUpdate}
            title="Update"
            isPhoneNumber={isPhoneNumber}
          />
        </Modal>
        {/* <Modal
          show={true}
          onHide={() => {
            setIsOpenModalUpdate(false);
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centeredxw
          style={{ marginTop: 200 }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>Bạn đã đặt hàng thành công</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 20 }}>
            <p style={{ fontSize: 16 }}>Bạn muốn di chuyển đến đâu?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                
              }}
            >
              <Button>Trang chủ</Button>
              <Button>Giỏ hàng</Button>
              <Button>Đơn hàng của bạn</Button>
            </div>
          </Modal.Body>
        </Modal> */}
      </div>
    </>
  );
};

export default PaymentPage;
