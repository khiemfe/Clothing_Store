import axios from "axios";
import { axiosJWT } from "./userServices";

export const getAllProduct = async (search, limit) => {
  let res;
  console.log("searchsearch", search);
  if (search?.length > 0) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    console.log("landau");
    console.log("limit", limit);
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`
    );
  }
  return res.data;
};

export const getGenderProduct = async (type, limit) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=gender&filter=${type}&limit=${limit}`
    );
    return res.data;
  }
};

export const getTypeProduct = async (type, page, limit) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
    );
    return res.data;
  }
};

export const getAllProductPropose = async (gender, age, size, limit) => {
  console.log("kqqq", gender, age, size, limit);
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all?filter=gender&filter=${gender}&filter=age&filter=${age}&filter=size&filter=${size}&limit=${limit}`
  );
  return res.data;
};

export const createProduct = async (access_token, data) => {
  console.log("access_tokencr", access_token);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
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

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
  );
  console.log("iiiiiiiiiiiiiiiiii", res);
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );
  return res.data;
};

export const getBestProduct = async (limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-best-product?limit=${limit}`
  );
  return res.data;
};
