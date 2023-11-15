import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddres: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      console.log("state", { state, action });
      const { orderItem } = action.payload;
      const checkitemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem?.product
      );
      if (checkitemOrder) {
        //nếu đã tồn tại trong giỏ hàng
        checkitemOrder.amount += orderItem?.amount;
      } else {
        state?.orderItems.push(orderItem);
      }
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const checkitemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      checkitemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const checkitemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      checkitemOrder.amount--;
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const checkitemOrder = state?.orderItems?.filter(
        (item) => item?.product !== idProduct
      );
      // const itemOrderSeleted = state?.orderItemsSlected?.filter(
      //   (item) => item?.product !== idProduct
      // );

      state.orderItems = checkitemOrder;
      // state.orderItemsSlected = itemOrderSeleted;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      console.log("listCheckedd", listChecked);
      const checkitemOrder = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.product)
      );

      state.orderItems = checkitemOrder;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
} = orderSlice.actions;

export default orderSlice.reducer;
