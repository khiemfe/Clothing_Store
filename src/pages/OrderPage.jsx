import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
} from "../redux/slices/orderSlice";

import { Form } from "antd";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  console.log("order", order?.orderItems);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [form] = Form.useForm();

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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h3>Chọn tất cả</h3>
        <input
          onChange={onChangeAll}
          checked={listChecked.length > 0 && listChecked?.length === order?.orderItems.length}
          type="checkbox"
        />
        <h4 onClick={handleDeleteAll} style={{ cursor: "pointer" }}>
          Xoá tất cả
        </h4>
      </div>
      {order?.orderItems?.map((item, index) => {
        return (
          <>
            <div key={index} style={{ display: "flex" }}>
              <input
                onChange={onChange}
                value={item.product}
                checked={listChecked.includes(item.product)}
                type="checkbox"
              />
              <h3>{item?.name}</h3>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <button
                  onClick={() => handleOnchangeCount("decrease", item.product)}
                >
                  -
                </button>
                <h4 style={{ padding: "0 5px" }}>{item?.amount}</h4>
                <button
                  onClick={() => handleOnchangeCount("increase", item.product)}
                >
                  +
                </button>
              </div>
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteOrder(item.product)}
              >
                Xoá
              </h4>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default OrderPage;
