import React, { useEffect, useState } from "react";
import ProductDetailsComponents from "../components/ProductDetailsComponents";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as ProducttServcie from "../services/ProductServices";
import { useLocation, useNavigate } from "react-router-dom";
// import { addOrderProduct } from "../redux/slices/orderSlice";
import LoadingComponents from "../components/LoadingComponents";
import { FiHeart } from "react-icons/fi";
import { convertPrice } from "../utils";
import { useMutationHook } from "../hooks/useMutationHook";
import * as CartServices from "../services/CartServices";
import { success, error, warning } from "../components/Message";
import HeaderComponents from "../components/HeaderComponents";
import LoadingProductDetailsComponent from "../components/LoadingProductDetailsComponent";
import { Toaster } from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id: idProduct } = useParams();
  console.log("params", idProduct); //id product

  const user = useSelector((state) => state.user);
  console.log("useruser", user); // lấy ra địa chỉ nhận hàng + sđt

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    console.log("idid", id);
    if (id) {
      const res = await ProducttServcie.getDetailsProduct(id);
      return res.data;
    }
  };
  const { isLoading, data: productDetails } = useQuery(
    ["products-details", idProduct],
    fetchGetDetailsProduct,
    {
      enabled: !!idProduct,
    }
  );
  console.log("productDetailss", productDetails);

  const images = {
    img1: productDetails?.image,
    img2: "https://levents.asia/wp-content/uploads/2022/06/POPULAR-LOGO-TEE_W1-1-scaled.jpg",
    img3: "https://levents.asia/wp-content/uploads/2022/06/BASIC-ID-TEE-D1-1-scaled.jpg",
    img4: "https://levents.asia/wp-content/uploads/2022/06/BASIC-ID-TEE-D4-1-scaled.jpg",
  };

  const [quantity, setQuantity] = useState();

  const className = "w-24 h-24 rounded-md cursor-pointer img-đetails img-3";
  const classNameActive =
    "w-24 h-24 rounded-md cursor-pointer img-đetails img-3 active";

  const [activeImg, setActiveImage] = useState(images.img1);

  const [className1, setClassName1] = useState(classNameActive);
  const [className2, setClassName2] = useState(className);
  const [className3, setClassName3] = useState(className);
  const [className4, setClassName4] = useState(className);

  const setClassName = () => {
    setClassName1(className);
    setClassName2(className);
    setClassName3(className);
    setClassName4(className);
  };

  const handleImg1 = () => {
    setActiveImage(images.img1);
    setClassName();
    setClassName1(classNameActive);
  };

  const handleImg2 = () => {
    setActiveImage(images.img2);
    setClassName();
    setClassName2(classNameActive);
  };

  const handleImg3 = () => {
    setActiveImage(images.img3);
    setClassName();
    setClassName3(classNameActive);
  };

  const handleImg4 = () => {
    setActiveImage(images.img4);
    setClassName();
    setClassName4(classNameActive);
  };

  const [amount, setAmount] = useState(1);

  // size
  const classNameSize = "size-item";
  const classNameSizeDisbled = "size-item disbled";
  const classNameSizeActive = "size-item active";

  const [size, setSize] = useState();

  const [classNameSizeS, setClassNameSizeS] = useState(classNameSize);
  const [classNameSizeM, setClassNameSizeM] = useState(classNameSize);
  const [classNameSizeL, setClassNameSizeL] = useState(classNameSize);
  const [classNameSizeXL, setClassNameSizeXL] = useState(classNameSize);
  const [classNameSizeXXL, setClassNameSizeXXL] = useState(classNameSize);

  const [classNameSize28, setClassNameSize28] = useState(classNameSize);
  const [classNameSize29, setClassNameSize29] = useState(classNameSize);
  const [classNameSize30, setClassNameSize30] = useState(classNameSize);
  const [classNameSize31, setClassNameSize31] = useState(classNameSize);
  const [classNameSize32, setClassNameSize32] = useState(classNameSize);
  const [classNameSize33, setClassNameSize33] = useState(classNameSize);
  const [classNameSize34, setClassNameSize34] = useState(classNameSize);
  const [classNameSize35, setClassNameSize35] = useState(classNameSize);
  const [classNameSize36, setClassNameSize36] = useState(classNameSize);

  const setClassNameSize = () => {
    setClassNameSizeS(classNameSize);
    setClassNameSizeM(classNameSize);
    setClassNameSizeL(classNameSize);
    setClassNameSizeXL(classNameSize);
    setClassNameSizeXXL(classNameSize);

    setClassNameSize28(classNameSize);
    setClassNameSize29(classNameSize);
    setClassNameSize30(classNameSize);
    setClassNameSize31(classNameSize);
    setClassNameSize32(classNameSize);
    setClassNameSize33(classNameSize);
    setClassNameSize34(classNameSize);
    setClassNameSize35(classNameSize);
    setClassNameSize36(classNameSize);
  };

  const handleSizeS = () => {
    setClassNameSize();
    setClassNameSizeS(classNameSizeActive);
    setSize("S");
    setQuantity(productDetails?.quantity?.sizeS);
  };

  const handleSizeM = () => {
    setClassNameSize();
    setClassNameSizeM(classNameSizeActive);
    setSize("M");
    setQuantity(productDetails?.quantity?.sizeM);
  };

  const handleSizeL = () => {
    setClassNameSize();
    setClassNameSizeL(classNameSizeActive);
    setSize("L");
    setQuantity(productDetails?.quantity?.sizeL);
  };

  const handleSizeXL = () => {
    setClassNameSize();
    setClassNameSizeXL(classNameSizeActive);
    setSize("XL");
    setQuantity(productDetails?.quantity?.sizeXL);
  };

  const handleSizeXXL = () => {
    setClassNameSize();
    setClassNameSizeXXL(classNameSizeActive);
    setSize("XXL");
    setQuantity(productDetails?.quantity?.sizeXXL);
  };

  const handleSize28 = () => {
    setClassNameSize();
    setClassNameSize28(classNameSizeActive);
    setSize("28");
    setQuantity(productDetails?.quantity?.size28);
  };

  const handleSize29 = () => {
    setClassNameSize();
    setClassNameSize29(classNameSizeActive);
    setSize("29");
    setQuantity(productDetails?.quantity?.size29);
  };

  const handleSize30 = () => {
    setClassNameSize();
    setClassNameSize30(classNameSizeActive);
    setSize("30");
    setQuantity(productDetails?.quantity?.size30);
  };

  const handleSize31 = () => {
    setClassNameSize();
    setClassNameSize31(classNameSizeActive);
    setSize("31");
    setQuantity(productDetails?.quantity?.size31);
  };

  const handleSize32 = () => {
    setClassNameSize();
    setClassNameSize32(classNameSizeActive);
    setSize("32");
    setQuantity(productDetails?.quantity?.size32);
  };

  const handleSize33 = () => {
    setClassNameSize();
    setClassNameSize33(classNameSizeActive);
    setSize("33");
    setQuantity(productDetails?.quantity?.size33);
  };

  const handleSize34 = () => {
    setClassNameSize();
    setClassNameSize34(classNameSizeActive);
    setSize("34");
    setQuantity(productDetails?.quantity?.size34);
  };

  const handleSize35 = () => {
    setClassNameSize();
    setClassNameSize35(classNameSizeActive);
    setSize("35");
    setQuantity(productDetails?.quantity?.size35);
  };

  const handleSize36 = () => {
    setClassNameSize();
    setClassNameSize36(classNameSizeActive);
    setSize("36");
    setQuantity(productDetails?.quantity?.size36);
  };

  // --

  // ----

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("size", size);

  const mutationAddCart = useMutationHook((data) => {
    console.log("loading cart true");
    const { userId, token, ...rest } = data;
    const res = CartServices.createCart(userId, token, { ...rest }); //rest or {...rest}
    return res;
  });

  const {
    isLoading: isLoadingAddCart,
    data: dataAddCart,
    isSuccess: isSuccessAddCart,
    isError: isErrorAddCart,
  } = mutationAddCart;

  const [amountCart, setAmountCart] = useState(0);
  const fetchOrderCart = async () => {
    // console.log('loading cart true')
    const res = await CartServices.getCartByUserId(
      user?.id,
      user?.access_token
    );
    setAmountCart(res?.data?.length);
    console.log("loading cart false");
  };

  console.log("amountCart", amountCart);

  useEffect(() => {
    if (isSuccessAddCart && dataAddCart?.status === "OK") {
      success("Bạn đã thêm vào giỏ hàng thành công");
      fetchOrderCart();
      setTimeout(() => {
        navigate("/order", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
      }, 0);
      // dispatch(
      //   addOrderProduct({
      //     orderItem: {
      //       name: productDetails?.name,
      //       amount: amount,
      //       size: size,
      //       image: productDetails?.image,
      //       price: productDetails?.price,
      //       product: productDetails?._id,
      //       userId: user?.id,
      //     },
      //   })
      // );
    } else if (isErrorAddCart) {
      error("Bạn đã thêm vào giỏ hàng thất bại");
    }
  }, [isSuccessAddCart, isErrorAddCart]);

  const hanleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname }); // login xong trở về lại trang lúc nảy
    } else {
      if (
        productDetails?.name &&
        amount &&
        size &&
        productDetails?.image &&
        productDetails?.price &&
        productDetails?.type &&
        user?.id &&
        idProduct
      ) {
        mutationAddCart.mutate({
          name: productDetails?.name,
          amount: amount,
          size: size,
          image: productDetails?.image,
          price: productDetails?.price,
          type: productDetails?.type,
          userId: user?.id,
          productId: idProduct,
        });
      }
    }
  };

  const [noSize, setNoSize] = useState(false);
  const hanleAddOrderNoSize = () => {
    setNoSize(true);
  };

  console.log("test sản phẩm", productDetails);
  console.log("test người dùng", user);

  return (
    <>
      {/* <HeaderComponents amount={amountCart} /> */}
      <Toaster />
      <div className="produc-details">
        {/* <ProductDetailsComponents idProduct={id} /> */}
        <LoadingProductDetailsComponent isLoading={isLoading} />
        {!isLoading && (
          <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center container">
            <div className="flex flex-col gap-6 lg:w-2/4 img-main">
              <img
                src={activeImg || images.img1}
                alt=""
                className="w-full h-full aspect-square object-cover rounded-xl img-đetails img-1"
              />
              <div className="flex flex-row justify-between h-24 img-anhphu">
                <img
                  src={images.img1}
                  alt=""
                  className={className1}
                  onClick={() => handleImg1()}
                />
                <img
                  src={images.img2}
                  alt=""
                  className={className2}
                  onClick={() => handleImg2()}
                />
                <img
                  src={images.img3}
                  alt=""
                  className={className3}
                  onClick={() => handleImg3()}
                />
                <img
                  src={images.img4}
                  alt=""
                  className={className4}
                  onClick={() => handleImg4()}
                />
              </div>
            </div>
            {/* ABOUT */}
            <div className="flex flex-col gap-4 lg:w-2/4 notify">
              <div>
                <h1 className="text-3xl font-bold name">
                  {productDetails?.name}
                </h1>
              </div>
              <div>
                <h5 className="text-2xl font-semibold gia">
                  {convertPrice(productDetails?.price)}
                </h5>
              </div>

              <div className="size">
                <div className="size-text">
                  <p>
                    Chọn size: <span>{size}</span>
                  </p>
                </div>
                {productDetails?.name.toLowerCase().includes("quần") &&
                !productDetails?.name.toLowerCase().includes("áo") ? (
                  <ul className="size-list">
                    {productDetails?.quantity?.size28 ? (
                      <li
                        onClick={() => handleSize28()}
                        className={classNameSize28}
                      >
                        28
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>28</li>
                    )}
                    {productDetails?.quantity?.size29 ? (
                      <li
                        onClick={() => handleSize29()}
                        className={classNameSize29}
                      >
                        29
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>29</li>
                    )}
                    {productDetails?.quantity?.size30 ? (
                      <li
                        onClick={() => handleSize30()}
                        className={classNameSize30}
                      >
                        30
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>30</li>
                    )}
                    {productDetails?.quantity?.size31 ? (
                      <li
                        onClick={() => handleSize31()}
                        className={classNameSize31}
                      >
                        31
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>31</li>
                    )}
                    {productDetails?.quantity?.size32 ? (
                      <li
                        onClick={() => handleSize32()}
                        className={classNameSize32}
                      >
                        32
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>32</li>
                    )}
                    {productDetails?.quantity?.size33 ? (
                      <li
                        onClick={() => handleSize33()}
                        className={classNameSize33}
                      >
                        33
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>33</li>
                    )}
                    {productDetails?.quantity?.size34 ? (
                      <li
                        onClick={() => handleSize34()}
                        className={classNameSize34}
                      >
                        34
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>34</li>
                    )}
                    {productDetails?.quantity?.size35 ? (
                      <li
                        onClick={() => handleSize35()}
                        className={classNameSize35}
                      >
                        35
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>35</li>
                    )}
                    {productDetails?.quantity?.size36 ? (
                      <li
                        onClick={() => handleSize36()}
                        className={classNameSize36}
                      >
                        36
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>36</li>
                    )}
                  </ul>
                ) : (
                  <ul className="size-list">
                    {productDetails?.quantity?.sizeS ? (
                      <li
                        onClick={() => handleSizeS()}
                        className={classNameSizeS}
                      >
                        S
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>S</li>
                    )}
                    {productDetails?.quantity?.sizeM ? (
                      <li
                        onClick={() => handleSizeM()}
                        className={classNameSizeM}
                      >
                        M
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>M</li>
                    )}
                    {productDetails?.quantity?.sizeL ? (
                      <li
                        onClick={() => handleSizeL()}
                        className={classNameSizeL}
                      >
                        L
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>L</li>
                    )}
                    {productDetails?.quantity?.sizeXL ? (
                      <li
                        onClick={() => handleSizeXL()}
                        className={classNameSizeXL}
                      >
                        XL
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>XL</li>
                    )}
                    {productDetails?.quantity?.sizeXXL ? (
                      <li
                        onClick={() => handleSizeXXL()}
                        className={classNameSizeXXL}
                      >
                        XXL
                      </li>
                    ) : (
                      <li className={classNameSizeDisbled}>XXL</li>
                    )}
                  </ul>
                )}
              </div>
              <div style={{ height: "40px" }}>
                {noSize && !size && (
                  <p style={{ color: "red", fontSize: "14px" }}>
                    Vui lòng chọn size
                  </p>
                )}
              </div>

              <p style={{ fontSize: "18px" }}>Số lượng: {quantity}</p>

              <p style={{ fontSize: "16px", fontStyle: "italic" }}>
                Đã bán: {productDetails?.selled}
              </p>

              <div
                class="fb-comments"
                data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                data-width=""
                data-numposts="5"
              ></div>
              <div className="flex flex-row items-center gap-12 choose">
                <div className="flex flex-row items-center cangiua">
                  {amount === 1 ? (
                    <button className="bg-gray-200 px-4 rounded-lg text-violet-800 text-3xl congtru">
                      -
                    </button>
                  ) : (
                    <button
                      className="bg-gray-200 px-4 rounded-lg text-violet-800 text-3xl congtru"
                      onClick={() => setAmount((prev) => prev - 1)}
                    >
                      -
                    </button>
                  )}
                  <span className="px-6 rounded-lg number">{amount}</span>
                  <button
                    className="bg-gray-200 px-4 rounded-lg text-violet-800 text-3xl congtru"
                    onClick={() => setAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                {size ? (
                  <>
                    <LoadingComponents isLoading={isLoadingAddCart} />
                    <button
                      onClick={hanleAddOrder}
                      className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full add"
                    >
                      Mua ngay
                    </button>
                  </>
                ) : (
                  <button
                    onClick={hanleAddOrderNoSize}
                    className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full add"
                  >
                    Mua ngay
                  </button>
                )}
                {/* <FiHeart className="iconHeart" /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;
