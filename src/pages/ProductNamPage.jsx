import React, { useState } from "react";
import * as ProductServices from "../services/ProductServices";
import LoadingCardComponent, {
  LoadingCardComponent5SP,
} from "../components/LoadingCardComponent";
import { useQuery } from "@tanstack/react-query";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponents from "../components/CardComponents";
import LoadingComponents from "../components/LoadingComponents";
import Button from "react-bootstrap/Button";
import banner from "../public/img/bannerNam.jpeg";

const ProductNamPage = () => {
  const limitState = 10;
  const [limit, setLimit] = useState(limitState);

  let lengthProducts = limitState;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  const fetchProductAll = async (context) => {
    console.log("context", context);
    const gender = context?.queryKey && context?.queryKey[0];
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getGenderProduct(gender, limit);
    return res;
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["nam", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  //   keepPreviousData: giữ lại product cũ, load những cái mới thôi
  console.log("isPreviousDataNam", isPreviousData); //loading

  return (
    <div style={{ marginTop: 110, marginBottom:50, minHeight: "100%" }}>
      <div style={{ width: "100%" }}>
        <img
          src={banner}
          alt=""
          style={{ width: "100%", height: "450px", objectFit: "cover" }}
        />
      </div>
      <h1
        style={{
          margin: 50,
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: 700,
          fontSize: 30,
        }}
      >
        Thời trang nam
      </h1>
      <div style={{ padding: "0 20px" }}>
        <LoadingCardComponent5SP
          isLoading={isLoading}
          arrayProducts={arrayProducts}
        >
          <Row>
            {products?.data?.map((product) => {
              console.log("productmap", product);
              return (
                <Col
                  style={{ flex: "0 0 auto", width: "20%" }}
                  key={product._id}
                >
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
        </LoadingCardComponent5SP>
      </div>
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
                onClick={() => setLimit((prev) => prev + 10)}
                variant="outline-primary"
              >
                Xem thêm
              </Button>{" "}
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductNamPage;
