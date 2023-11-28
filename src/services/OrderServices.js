import axios from "axios";
import { axiosJWT } from "./userServices";

export const createOrder = async (id, access_token, data) => {
  console.log("datadata2", data);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log("iiiiiiiiiiiiiiiiii", res);
  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-all-order-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log("iiiiiiiiiiiiiiiiii", res);
  return res.data;
};

export const getDetailsOrder = async (id, orderId, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-details-order/${id}/${orderId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log("iiiiiiiiiiiiiiiiii", res);
  return res.data;
};

export const cancelOrder = async (id, access_token, orderItems, userId) => {
  const data = { orderItems, orderId: id };
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/order/cancel-order/${userId}`,
    { data },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get-all-order`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
