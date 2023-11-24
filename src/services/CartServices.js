import axios from "axios";
import { axiosJWT } from "./userServices";

export const createCart = async (id, access_token, data) => {
  console.log("datadata2", data);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/cart/create/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getCartByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/cart/get-all-cart/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const getDetailsOrder = async (id, access_token) => {
//   const res = await axiosJWT.get(
//     `${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   console.log("iiiiiiiiiiiiiiiiii", res);
//   return res.data;
// };

export const deleteCart = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/cart/delete-cart/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyCart = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/cart/delete-many-cart`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
