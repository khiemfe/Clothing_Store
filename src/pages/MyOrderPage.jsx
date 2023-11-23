import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import * as OrderServcie from "../services/OrderServices";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHook } from "../hooks/useMutationHook";
import { success, error, warning } from "../components/Message";
import { div } from "@tensorflow/tfjs";
import { convertPrice } from "../utils";
import { Button } from "antd";
import { Modal } from "antd";

const MyOrderPage = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { state } = location;
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
  }, [state]);

  const queryOrder = useQuery(["order"], fetchMyOrder, {
    enabled: enabled,
  });
  const { data: dataOrder, isLoading } = queryOrder;
  console.log("dataOrder", dataOrder);

  const navigate = useNavigate();

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
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
    console.log("ordercan", order);
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
      success();
    } else if (isErrorCancel) {
      error();
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="my-order">
        <h1 style={{ textAlign: "center" }}>Đơn hàng của bạn</h1>
        <div className="body">
          {dataOrder?.map((item, key) => {
            return (
              <>
                {item?.orderItems.length && (
                  <div style={{ border: "1px solid #ccc" }}>
                    {item?.orderItems?.map((order, index) => {
                      return (
                        <>
                          <img
                            style={{ width: "100px" }}
                            src={order?.image}
                            alt=""
                          />
                          <div className="body-text">
                            <h1>{order?.name}</h1>
                            <h3>{convertPrice(order?.price)}</h3>
                          </div>
                          <div></div>
                        </>
                      );
                    })}
                    <h3>{convertPrice(item?.totalPrice)}</h3>
                    <div>
                      <h3
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDetailsOrder(item?._id)}
                      >
                        Xem chi tiết
                      </h3>
                      {/* <h3
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCancelOrder(item)}
                      >
                        Huỷ
                      </h3> */}
                      <Button type="primary" onClick={showModal}>
                       Huỷ
                      </Button>
                      <Modal
                        title="Basic Modal"
                        open={isModalOpen}
                        onOk={() => {
                          setIsModalOpen(false);
                          handleCancelOrder(item)
                        }}
                        onCancel={() => setIsModalOpen(false)}
                      >
                        <p>Some contents...</p>
                      </Modal>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrderPage;
