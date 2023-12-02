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
import LoadingComponents from "../components/LoadingComponents";
import LoadingTypeComponent from "../components/LoadingTypeComponent";

const HomePage = () => {
  const refSearch = useRef();
  const limitState = 8;
  const [limit, setLimit] = useState(limitState);

  let lengthProducts = limitState;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  const fetchProductAll = async (context) => {
    console.log("context", context);
    // const gender = context?.queryKey && context?.queryKey[0];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getAllProduct("", limit);
    return res;
  };

  const {
    isLoading: isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["product", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  //   keepPreviousData: giữ lại product cũ, load những cái mới thôi
  console.log("isPreviousDataNam", isPreviousData); //loading

  const [arrType, setArrType] = useState([]);
  const [loadingType, setLoadingType] = useState(true);
  const fetchAllType = async () => {
    setLoadingType(true);
    const res = await ProductServices.getAllType();
    if (res?.status === "OK") {
      setArrType(res?.data);
      setLoadingType(false);
    }
  };
  useEffect(() => {
    fetchAllType();
  }, []);
  console.log("loadingType", loadingType);

  console.log("arrType", arrType);

  return (
    <div className="home">
      <Row className="content">
        <Col xxl={2} xl={2} className="_navbar">
          <div style={{ position: "fixed" }}>
            <LoadingTypeComponent isLoading={loadingType} />
            {!loadingType && <NavbarComponents arrType={arrType} />}
          </div>
        </Col>
        <Col xxl={10} xl={10}>
          <div className="slide-product">
            <div className="slide">
              <SlideComponents arrImages={[slide1, slide2, slide3, slide4]} />
            </div>

            <div style={{marginTop: 50}}>
              <LoadingCardComponent
                isLoading={isLoading}
                arrayProducts={arrayProducts}
              >
                <Row>
                  {products?.data?.map((product) => {
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
              {/* ---- */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <LoadingComponents isLoading={isPreviousData} />
              </div>
              <div>
                {products?.totalPage !== 1 &&
                  // soluongPage !== 1 &&
                  !isLoading &&
                  !isPreviousData && (
                    <div className="see-more">
                      <Button
                        // disabled={
                        //   isPreviousDataNam ||
                        //   products?.totalProduct === products?.data.length
                        // }
                        onClick={() => setLimit((prev) => prev + 8)}
                        variant="outline-primary"
                      >
                        Xem thêm
                      </Button>{" "}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
