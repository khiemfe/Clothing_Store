import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
} from "../redux/slices/orderSlice";
import Modal from "react-bootstrap/Modal";
import { Form } from "antd";
import { convertPrice } from "../utils";
import LoadingUpdateComponent from "../components/LoadingUpdateComponent";
import ModelUpdateUserComponent from "../components/ModelUpdateUserComponent";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "../components/Message";
import { updateUser } from "../redux/slices/userSlice";
import * as UserServcie from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import StepsComponent from "../components/StepsComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  console.log("order", order?.orderItems);
  const user = useSelector((state) => state.user);
  console.log("userrr", user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [formUpdate] = Form.useForm();
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleOnchangeCount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    console.log("idProduct", idProduct);
    dispatch(removeOrderProduct({ idProduct }));
  };

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const onChangeAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };
  console.log("listChecked", listChecked);

  const handleDeleteAll = () => {
    if (listChecked.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected.reduce((total, cur) => {
      return total + cur?.price * cur?.amount;
    }, 0);
    return result;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 300) {
      return 10;
    } else if (priceMemo === 0 || priceMemo >= 500) {
      return 0;
    } else {
      return 20;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, diliveryPriceMemo]);

  // -------

  const [stateUserDetailsUpdate, setStateUserDetailsUpdate] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const mutationUpdate = useMutationHook((data) => {
    console.log("dataUpdate: ", data);
    const { id, access_token, ...rest } = data;
    const res = UserServcie.updateUser(id, rest, access_token);
    console.log("resssss", res);
    return res;
  });

  const { data, isLoading, isSuccess, isError, variables } = mutationUpdate;
  console.log("mutationUpdate", mutationUpdate);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      success();
      setIsOpenModalUpdate(false);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      error();
    }
  }, [isSuccess, isError]);

  const handleOnchangeDetailsUpdate = (e) => {
    setStateUserDetailsUpdate({
      ...stateUserDetailsUpdate,
      [e.target.name]: e.target.value,
    });
  };

  console.log("stateUserDetailsUpdate", stateUserDetailsUpdate);

  const handleBuy = () => {
    if (user?.phone && user?.address && user?.name) {
      navigate("/payment");
    } else {
      setIsOpenModalUpdate(true);
    }
  };

  useEffect(() => {
    formUpdate.setFieldsValue(stateUserDetailsUpdate);
  }, [formUpdate, stateUserDetailsUpdate]);

  const handleGetDetailsUser = async (id, token) => {
    setIsLoadingUpdate(true);
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserServcie.getDetailsUser(id, token);
    console.log("res?.data", res);
    setIsLoadingUpdate(false);
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

  // const onCloseModal = () => {
  //   setIsOpenModalUpdate(false);
  //   setStateUserDetailsUpdate({
  //     name: "",
  //     phone: "",
  //     address: "",
  //   });
  //   formUpdate.resetFields();
  // };

  const itemsSteps = [
    {
      title: "Mua",
      description: "",
    },
    {
      title: "FreeShip 50%",
      description: "300k",
      // subTitle: "Left 00:00:08",
    },
    {
      title: "FreeShip",
      description: "500k",
    },
  ];

  return (
    <>
      <h1 style={{ margin: "20px 0", textAlign: "center" }}>
        Giỏ hàng ({order?.orderItems.length} sản phẩm)
      </h1>
      <div className="cart-body">
        <div className="cart-shopping">
          <StepsComponent
            current={priceMemo >= 500 ? 3 : priceMemo >= 300 ? 2 : priceMemo > 0 ? 1 : 0 }
            items={itemsSteps}
          />
          <div className="title">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                onChange={onChangeAll}
                checked={
                  listChecked.length > 0 &&
                  listChecked?.length === order?.orderItems.length
                }
                type="checkbox"
                className="checkbox"
              />
            </div>
            {listChecked.length > 0 && (
              <h4 onClick={handleDeleteAll} style={{ cursor: "pointer" }}>
                Xoá tất cả
              </h4>
            )}
          </div>
          {order?.orderItems?.map((item, index) => {
            return (
              <span key={index}>
                <div style={{ display: "flex" }} className="item-product">
                  <input
                    onChange={onChange}
                    value={item.product}
                    checked={listChecked.includes(item.product)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <img src={item.image} alt="" className="img-product" />
                  <div className="text-product">
                    <h3 className="name-product">{item?.name}</h3>
                    <h3 className="price-product">
                      {convertPrice(item?.price)}
                    </h3>
                    <div className="amount-product">
                      <button
                        onClick={() =>
                          handleOnchangeCount("decrease", item.product)
                        }
                      >
                        -
                      </button>
                      <span style={{ padding: "0 5px" }}>{item?.amount}</span>
                      <button
                        onClick={() =>
                          handleOnchangeCount("increase", item.product)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "end" }}>
                    <h4>{convertPrice(item.price * item.amount)}</h4>
                    <h4
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        fontSize: "26px",
                      }}
                      onClick={() => handleDeleteOrder(item.product)}
                    >
                      <MdDeleteOutline />
                    </h4>
                  </div>
                </div>
              </span>
            );
          })}
        </div>
        <div className="pay">
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
          {listChecked.length > 0 ? (
            <button className="pay-btn" onClick={handleBuy}>
              Mua ngay({listChecked?.length})
            </button>
          ) : (
            <button className="pay-btn disbled">Mua ngay</button>
          )}
        </div>
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
            isLoading={isLoading}
            title="Update"
          />
        </LoadingUpdateComponent>
      </Modal>
    </>
  );
};

export default OrderPage;
