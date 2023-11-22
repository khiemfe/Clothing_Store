import axios from "axios";
import { axiosJWT } from "./userServices";

export const createOrder = async (access_token, data) => {
  console.log("datadata2", data);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
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
