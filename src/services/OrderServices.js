import axios from "axios";
import { axiosJWT } from "./userServices";

export const createOrder = async (access_token, data) => {
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
