import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import * as OrderServcie from "../services/OrderServices";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "../components/Message";
import { convertPrice } from "../utils";
import { Button } from "antd";
import { Modal } from "antd";
import LoadingComponents from "../components/LoadingComponents";
import { Toaster } from "react-hot-toast";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const user = useSelector((state) => state.user);
  console.log("state", state);
  const fetchMyOrder = async () => {
    const res = await OrderServcie.getOrderByUserId(state?.id, state?.token);
    return res?.data;
  };

  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (state?.id && state?.token) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, []);

  const queryOrder = useQuery(["order"], fetchMyOrder, {
    enabled: enabled,
  });
  const { data: dataOrder, isLoading } = queryOrder;
  console.log("dataOrder", dataOrder);

  const navigate = useNavigate();

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        id: state?.id,
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHook((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderServcie.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCancelOrder = (order) => {
    console.log("ordercan", order._id);
    mutation.mutate(
      {
        id: order._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch(); //khi thành công thì nó load lại
        },
      }
    );
  };

  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancel,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      success("Bạn đã huỷ đơn hàng thành công");
    } else if (isErrorCancel) {
      error("Bạn đã huỷ đơn hàng thành công");
    }
  }, [isSuccessCancel, isErrorCancel]);

  const [okHuy, setOkHuy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (item) => {
    setIsModalOpen(true);
    setOkHuy(item);
  };

  const handleOkModel = () => {
    handleCancelOrder(okHuy);
    setIsModalOpen(false);
    setOkHuy("");
  };

  return (
    <>
      <div className="my-order">
        <Toaster />
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0",
            textTransform: "uppercase",
          }}
        >
          Đơn hàng của bạn
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingComponents isLoading={isLoading} />
        </div>
        <div className="body">
          {dataOrder?.length > 0 &&
            dataOrder?.map((item, index) => {
              return (
                <div key={index}>
                  {item?.orderItems.length && (
                    <div className="product">
                      <div>
                        {item?.orderItems?.map((order, index) => {
                          return (
                            <div className="item" key={index}>
                              <img src={order?.image} alt="" />
                              <div className="body-text">
                                <h3>{order?.name}</h3>
                                <p>{convertPrice(order?.price)}</p>
                                <p>Size: {order?.size}</p>
                                <p>Số lượng: {order?.amount}</p>
                              </div>
                              <div></div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="right">
                        <div className="price">
                          <h3>Phí ship: {convertPrice(item?.shippingPrice)}</h3>
                          <h3>Tổng tiền: {convertPrice(item?.totalPrice)}</h3>
                        </div>

                        <div className="action">
                          <h3
                            style={{ cursor: "pointer", marginBottom: 10 }}
                            onClick={() => handleDetailsOrder(item?._id)}
                          >
                            Xem chi tiết
                          </h3>
                          {/* <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => handleCancelOrder(item)}
                        >
                          Huỷy
                        </h3> */}
                          <Button
                            // type="primary"
                            onClick={() => showModal(item)}
                          >
                            Huỷ
                          </Button>
                          <Modal
                            title="Thông báo"
                            open={isModalOpen}
                            onOk={handleOkModel}
                            onCancel={() => setIsModalOpen(false)}
                          >
                            <p>Bạn có muốn huỷ đơn hàng này?</p>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyOrderPage;
