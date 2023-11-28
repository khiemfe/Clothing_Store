import React, { useEffect, useRef, useState } from "react";
import SlideComponents from "../components/SlideComponents";
import slide1 from "../public/img/slide1.jpeg";
import slide2 from "../public/img/slide2.jpeg";
import slide3 from "../public/img/slide3.jpeg";
import slide4 from "../public/img/slide4.jpeg";
import CardComponents from "../components/CardComponents";
import NavbarComponents from "../components/NavbarComponents";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../services/ProductServices";
import LoadingCardComponent from "../components/LoadingCardComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../hooks/useDebounce";
import LoadingComponents from "../components/LoadingComponents";

const HomePage = () => {
  const refSearch = useRef();
  const limitState = 4;
  const [limitNam, setLimitNam] = useState(limitState);
  const [limitNu, setLimitNu] = useState(limitState);

  let lengthProducts = limitState;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  const fetchProductAllNam = async (context) => {
    console.log("context", context);
    const gender = context?.queryKey && context?.queryKey[0];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getGenderProduct(gender, limit);
    return res;
  };

  const {
    isLoading: isLoadingNam,
    data: productsNam,
    isPreviousData: isPreviousDataNam,
  } = useQuery(["nam", limitNam], fetchProductAllNam, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  //   keepPreviousData: giữ lại product cũ, load những cái mới thôi
  console.log("isPreviousDataNam", isPreviousDataNam); //loading

  const fetchProductAllNu = async (context) => {
    console.log("context", context);
    const gender = context?.queryKey && context?.queryKey[0];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getGenderProduct(gender, limit);
    return res;
  };

  const {
    isLoading: isLoadingNu,
    data: productsNu,
    isPreviousData: isPreviousDataNu,
  } = useQuery(["nữ", limitNu], fetchProductAllNu, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  //   keepPreviousData: giữ lại product cũ, load những cái mới thôi
  console.log("isPreviousDataNu", isPreviousDataNu); //loading

  const [arrType, setArrType] = useState([]);
  const fetchAllType = async () => {
    const res = await ProductServices.getAllType();
    if (res?.status === "OK") {
      setArrType(res?.data);
    }
  };
  useEffect(() => {
    fetchAllType();
  }, []);

  console.log("arrType", arrType);

  return (
    <div className="home">
      <Row className="content">
        <Col xxl={2} xl={2} className="_navbar">
          <div style={{ position: "fixed" }}>
            <NavbarComponents arrType={arrType} />
          </div>
        </Col>
        <Col xxl={10} xl={10}>
          <div className="slide-product">
            <div className="slide">
              <SlideComponents arrImages={[slide1, slide2, slide3, slide4]} />
            </div>

            <div id="Nam" className="product">
              <h1>Nam</h1>
              <LoadingCardComponent
                isLoading={isLoadingNam}
                arrayProducts={arrayProducts}
              >
                <Row>
                  {productsNam?.data?.map((product) => {
                    console.log("productmap", product);
                    return (
                      <Col xxl={3} xl={3} key={product._id}>
                        {/* <a href="/product-details"> */}
                        <CardComponents
                          id={product._id}
                          countInstock={product.countInstock}
                          description={product.description}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          rating={product.rating}
                          gender={product.gender}
                          discount={product.discount}
                          selled={product.selled}
                          age={product.age}
                          size={product.size}
                        />
                        {/* </a> */}
                      </Col>
                    );
                  })}
                </Row>
              </LoadingCardComponent>
            </div>
            {/* ---- */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <LoadingComponents isLoading={isPreviousDataNam} />
            </div>
            <div>
              {productsNam?.totalPage !== 1 &&
                // soluongPage !== 1 &&
                !isLoadingNam &&
                !isPreviousDataNam && (
                  <div className="see-more">
                    <Button
                      // disabled={
                      //   isPreviousDataNam ||
                      //   products?.totalProduct === products?.data.length
                      // }
                      onClick={() => setLimitNam((prev) => prev + 8)}
                      variant="outline-primary"
                    >
                      Xem thêm
                    </Button>{" "}
                  </div>
                )}
            </div>

            {/* ---- */}

            <div id="Nữ" className="product">
              <h1>Nữ</h1>
              <LoadingCardComponent
                isLoading={isLoadingNam}
                arrayProducts={arrayProducts}
              >
                <Row>
                  {productsNu?.data?.map((product) => {
                    console.log("productmap", product);
                    return (
                      <Col xxl={3} xl={3} key={product._id}>
                        {/* <a href="/product-details"> */}
                        <CardComponents
                          id={product._id}
                          countInstock={product.countInstock}
                          description={product.description}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          rating={product.rating}
                          gender={product.gender}
                          discount={product.discount}
                          selled={product.selled}
                          age={product.age}
                          size={product.size}
                        />
                        {/* </a> */}
                      </Col>
                    );
                  })}
                </Row>
              </LoadingCardComponent>
            </div>
            {/* ---- */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <LoadingComponents isLoading={isPreviousDataNu} />
            </div>
            <div>
              {productsNu?.totalPage !== 1 &&
                // soluongPage !== 1 &&
                !isLoadingNu &&
                !isPreviousDataNu && (
                  <div className="see-more">
                    <Button
                      // disabled={
                      //   isPreviousDataNam ||
                      //   products?.totalProduct === products?.data.length
                      // }
                      onClick={() => setLimitNu((prev) => prev + 8)}
                      variant="outline-primary"
                    >
                      Xem thêm
                    </Button>{" "}
                  </div>
                )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
