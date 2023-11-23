import React from "react";
import { useLocation, useParams } from "react-router-dom";
import * as OrderServcie from "../services/OrderServices";
import { useQuery } from "@tanstack/react-query";

const DetailsOrderPage = () => {
  const params = useParams();
    const {id} = params
  const location = useLocation();
  const { state } = location;
  console.log("state", state);
  const fetchOrderDetails = async () => {
    const res = await OrderServcie.getDetailsOrder(id, state?.token);
    return res?.data;
  };
  const queryOrderDetails = useQuery(["order-details"], fetchOrderDetails);
  const { data: dataOrderDetails, isLoading } = queryOrderDetails;
  console.log("dataOrderDetails", dataOrderDetails);

  return (
    <>
        <h1>{dataOrderDetails?.orderItems?.map((item, index) => {
            return (
                <>
                    <h1>{item?.name}</h1>
                </>
            )
        })}</h1>
    </>
  )
};

export default DetailsOrderPage;
