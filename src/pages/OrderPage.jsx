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
    <>
      <h1 style={{ margin: "20px 0", textAlign: "center" }}>Giỏ hàng</h1>
      <div className="cart-body">
        <div className="cart-shopping">
          <div className="title">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                onChange={onChangeAll}
                checked={
                  listChecked.length > 0 &&
                  listChecked?.length === order?.orderItems.length
                }
                type="checkbox"
                className="checkbox"
              />
              <h4>{order?.orderItems.length} sản phẩm</h4>
            </div>
            {listChecked.length > 0 && (
              <h4 onClick={handleDeleteAll} style={{ cursor: "pointer" }}>
                Xoá tất cả
              </h4>
            )}
          </div>
          {order?.orderItems?.map((item, index) => {
            return (
              <span key={index}>
                <div style={{ display: "flex" }} className="item-product">
                  <input
                    onChange={onChange}
                    value={item.product}
                    checked={listChecked.includes(item.product)}
                    type="checkbox"
                    className="checkbox"
                  />
                  <img src={item.image} alt="" className="img-product" />
                  <div className="text-product">
                    <h3 className="name-product">{item?.name}</h3>
                    <h3 className="price-product">
                      {item?.price}.000{" "}
                      <span style={{ textDecoration: "underline" }}>đ</span>
                    </h3>
                    <div className="amount-product">
                      <button
                        onClick={() =>
                          handleOnchangeCount("decrease", item.product)
                        }
                      >
                        -
                      </button>
                      <span style={{ padding: "0 5px" }}>{item?.amount}</span>
                      <button
                        onClick={() =>
                          handleOnchangeCount("increase", item.product)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <h4
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteOrder(item.product)}
                  >
                    Xoá
                  </h4>
                </div>
              </span>
            );
          })}
        </div>
        <div className="pay">
          <ul className="pay-list">
            <li className="pay-item">
              <h3>Tạm tính</h3>
              <span>0</span>
            </li>
            <li className="pay-item">
              <h3>Giảm giá</h3>
              <span>0</span>
            </li>
            <li className="pay-item">
              <h3>Thuế</h3>
              <span>0</span>
            </li>
            <li className="pay-item">
              <h3>Phí giao hàng</h3>
              <span>0</span>
            </li>
          </ul>
          {listChecked.length > 0 ? (
            <button className="pay-btn">Mua ngay</button>
          ) : (
            <button className="pay-btn disbled">Mua ngay</button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
