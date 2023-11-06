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
  const [limit, setLimit] = useState(8);

  const fetchProductAll = async (context) => {
    console.log("context", context);
    // lengthProduct = con
    const limit = context?.queryKey && context?.queryKey[1];
    // const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductServices.getAllProduct("", limit);
    // if (search?.length > 0 || refSearch.current) {
    //   setStateProduct(res?.data);
    //   return [];
    // } else {
    return res;
    // }
  };

  let lengthProducts = limit;

  console.log("lengthProducts", lengthProducts);

  const arrayProducts = [];

  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  const searchProduct = useSelector((state) => state.product?.search);
  console.log("productSearch", searchProduct);

  const searchDebounce = useDebounce(searchProduct, 1000);

  //   const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //     //lần đầu tiên nó không chạy
  //     if (refSearch.current && searchProduct) {
  //       //   setLoading(true);
  //       fetchProductAll(searchDebounce);
  //     }
  //     refSearch.current = true;
  //     // setLoading(false);
  //   }, [searchDebounce]);

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  console.log("data", products);
  //   keepPreviousData: giữ lại product cũ, load những cái mới thôi
  console.log("isPreviousData", isPreviousData); //loading

  //   const [stateProduct, setStateProduct] = useState([]);
  //   useEffect(() => {
  //     if (products?.data?.length > 0) {
  //       setStateProduct(products?.data);
  //     }
  //   }, [products]);

  let soluongProducts = products?.data.length;
  if (products?.data.length === 0) {
    soluongProducts = products?.totalProduct;
  }

  const soluongPage = Math.ceil(products?.totalProduct / soluongProducts);
  console.log("soluongPage", soluongPage);

  return (
    <div className="home">
      <Row className="content">
        <Col xxl={2} xl={2} className="_navbar">
          <NavbarComponents />
        </Col>
        <Col xxl={10} xl={10}>
          <div className="slide-product">
            <div className="slide">
              <SlideComponents arrImages={[slide1, slide2, slide3, slide4]} />
            </div>
            <div className="product">
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
                          type={product.type}
                          discount={product.discount}
                          selled={product.selled}
                          age={product.age}
                          bmi={product.bmi}
                        />
                        {/* </a> */}
                      </Col>
                    );
                  })}
                </Row>
              </LoadingCardComponent>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px'
            }}>
              <LoadingComponents isLoading={isPreviousData} />
            </div>
            <div>
              {products?.totalPage !== 1 && soluongPage !== 1 && !isLoading && !isPreviousData && (
                <div className="see-more">
                  <Button
                    // disabled={
                    //   isPreviousData ||
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
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
