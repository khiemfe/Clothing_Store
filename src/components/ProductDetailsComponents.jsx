import React, { useEffect, useRef, useState } from "react";
import * as ProducttServcie from "../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import LoadingComponents from "./LoadingComponents";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../redux/slices/orderSlice";

const ProductDetailsComponents = ({ idProduct }) => {
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
  console.log("productDetails", productDetails);

  const images = {
    img1: productDetails?.image,
    img2: "https://levents.asia/wp-content/uploads/2022/06/POPULAR-LOGO-TEE_W1-1-scaled.jpg",
    img3: "https://levents.asia/wp-content/uploads/2022/06/BASIC-ID-TEE-D1-1-scaled.jpg",
    img4: "https://levents.asia/wp-content/uploads/2022/06/BASIC-ID-TEE-D4-1-scaled.jpg",
  };

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
  const classNameSizeActive = "size-item active";

  const [size, setSize] = useState("S");

  const [classNameSize1, setClassNameSize1] = useState(classNameSizeActive);
  const [classNameSize2, setClassNameSize2] = useState(classNameSize);
  const [classNameSize3, setClassNameSize3] = useState(classNameSize);
  const [classNameSize4, setClassNameSize4] = useState(classNameSize);
  const [classNameSize5, setClassNameSize5] = useState(classNameSize);

  const setClassNameSize = () => {
    setClassNameSize1(classNameSize);
    setClassNameSize2(classNameSize);
    setClassNameSize3(classNameSize);
    setClassNameSize4(classNameSize);
    setClassNameSize5(classNameSize);
  };

  const handleSize1 = () => {
    setClassNameSize();
    setClassNameSize1(classNameSizeActive);
    setSize("S");
  };

  const handleSize2 = () => {
    setClassNameSize();
    setClassNameSize2(classNameSizeActive);
    setSize("M");
  };

  const handleSize3 = () => {
    setClassNameSize();
    setClassNameSize3(classNameSizeActive);
    setSize("L");
  };

  const handleSize4 = () => {
    setClassNameSize();
    setClassNameSize4(classNameSizeActive);
    setSize("XL");
  };

  const handleSize5 = () => {
    setClassNameSize();
    setClassNameSize5(classNameSizeActive);
    setSize("XXL");
  };

  // ----

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const hanleAddOrder = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname }); // login xong trở về lại trang lúc nảy
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: amount,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      )
    }
  };

  console.log("test sản phẩm", productDetails);
  console.log("test người dùng", user);

  return (
    <>
      <LoadingComponents isLoading={isLoading} />
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
            <h1 className="text-3xl font-bold name">{productDetails?.name}</h1>
          </div>
          <h6 className="text-2xl font-semibold gia">
            {productDetails?.price}.000 <span>đ</span>
          </h6>
          <div className="size">
            <div className="size-text">
              <p>
                Chọn size: <span>{size}</span>
              </p>
            </div>
            <ul className="size-list">
              <li onClick={() => handleSize1()} className={classNameSize1}>
                S
              </li>
              <li onClick={() => handleSize2()} className={classNameSize2}>
                M
              </li>
              <li onClick={() => handleSize3()} className={classNameSize3}>
                L
              </li>
              <li onClick={() => handleSize4()} className={classNameSize4}>
                XL
              </li>
              <li onClick={() => handleSize5()} className={classNameSize5}>
                XXL
              </li>
            </ul>
          </div>
          <div className="flex flex-row items-center gap-12 choose">
            <div className="flex flex-row items-center cangiua">
              {amount === 0 ? (
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
            <button
              onClick={hanleAddOrder}
              className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full add"
            >
              Mua ngay
            </button>
            <FiHeart className="iconHeart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsComponents;
