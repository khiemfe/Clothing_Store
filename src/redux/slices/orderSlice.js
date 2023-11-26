import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
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
    // addOrderProduct: (state, action) => {
    //   console.log("state", { state, action });
    //   const { orderItem } = action.payload;
    //   // state?.orderItems là tất cả orderItems trong order redux
    //   const itemOrder = state?.orderItems?.find(
    //     (item) =>
    //       item?.product === orderItem?.product &&
    //       item?.userId === orderItem?.userId &&
    //       item?.size === orderItem?.size
    //   );
    //   console.log("orderItem", orderItem);

    //   if (itemOrder) {
    //     //nếu đã tồn tại trong giỏ hàng và cùng người dùng thì tăng số lượng trong giỏ
    //     itemOrder.amount += orderItem?.amount;
    //   } else {
    //     state?.orderItems.push(orderItem);
    //   }
    // },
    updateOrderProduct: (state, action) => {
      // console.log("stateUpdate", action.payload);
      state.orderItems = action.payload?.dataCart || [];
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?._id === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?._id === idProduct
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?._id === idProduct
      );
      const itemOrderSelected = state?.orderItemsSelected?.find(
        (item) => item?._id === idProduct
      );
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    // removeOrderProduct: (state, action) => {
    //   const { idProduct } = action.payload;
    //   const itemOrder = state?.orderItems?.filter(
    //     (item) => item?._id !== idProduct
    //   );
    //   const itemOrderSeleted = state?.orderItemsSelected?.filter(
    //     (item) => item?._id !== idProduct
    //   );
    //   state.orderItems = itemOrder;
    //   state.orderItemsSelected = itemOrderSeleted;
    // },
    // removeAllOrderProduct: (state, action) => {
    //   const { listChecked } = action.payload;
    //   const itemOrder = state?.orderItems?.filter(
    //     (item) => !listChecked.includes(item._id)
    //   );
    //   const itemOrderSelected = state?.orderItemsSelected?.filter(
    //     (item) => !listChecked.includes(item._id)
    //   );
    //   state.orderItems = itemOrder;
    //   state.orderItemsSelected = itemOrderSelected;
    // },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state?.orderItems?.forEach((order) => {
        if (listChecked.includes(order._id + `size${order.size}`)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSelected = orderSelected;
      console.log("selected", state.orderItemsSelected);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  // addOrderProduct,
  updateOrderProduct,
  increaseAmount,
  decreaseAmount,
  // removeOrderProduct,
  // removeAllOrderProduct,
  selectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
