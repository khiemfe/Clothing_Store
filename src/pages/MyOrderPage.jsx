import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import * as OrderServcie from "../services/OrderServices";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MyOrderPage = () => {
  const location = useLocation();
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

  return (
    <>
      <div className="my-order">
        <h2>Đơn hàng đã đặt thành công</h2>
        <div>
          
        </div>
      </div>
    </>
  );
};

export default MyOrderPage;
