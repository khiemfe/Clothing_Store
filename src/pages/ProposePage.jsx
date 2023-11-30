import React, { useEffect, useState } from "react";
import ProposeComponents from "../components/ProposeComponents";
import Button from "react-bootstrap/Button";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../services/ProductServices";
import CardProposeComponents from "../components/CardProposeComponents";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { LoadingCardComponent5SP } from "../components/LoadingCardComponent";
import LoadingComponents from "../components/LoadingComponents";
import CardComponents from "../components/CardComponents";

const ProposePage = () => {
  const imgStorage = localStorage.getItem("img");
  const imageBase64 = JSON.parse(imgStorage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(10);
  const [isLoadingPropose, setIsLoadingPropose] = useState(true);

  useEffect(async () => {
    if (!isLoaded) {
      await axios
        .post("https://clothing-server-btam.onrender.com/api/save/proposed", {
          imageBase64,
        })
        .then((res) => {
          console.log("ok", res);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const [result_age, set_result_age] = useState("");
  const [result_size, set_result_size] = useState("");
  const [result_gender, set_result_gender] = useState("");

  useEffect(() => {
    const result = fetch("/save").then((response) =>
      response.json().then((data) => data)
    );
    const arrResult = async () => {
      const arr = await result;
      console.log("duLieu", arr);
      set_result_gender(arr[0]);
      set_result_age(arr[1]);
      set_result_size(arr[2]);
    };
    arrResult();
  }, []);

  const fetchProductAll = async (context) => {
    const gender = context?.queryKey && context?.queryKey[1];
    const age = context?.queryKey && context?.queryKey[2];
    const size = context?.queryKey && context?.queryKey[3];
    const limit = context?.queryKey && context?.queryKey[4];
    if (gender && age && size) {
      setIsLoadingPropose(false);
      const res = await ProductServices.getAllProductPropose(
        gender,
        age,
        size,
        limit
      );
      return res;
    }
  };

  let {
    isLoading,
    data: product,
    isPreviousData,
  } = useQuery(
    ["product", result_gender, result_age, result_size, limit],
    fetchProductAll,
    {
      retry: 3,
      keepPreviousData: true,
    }
  );
  console.log("productproduct", product);

  const arrayProducts = [];
  for (let i = 1; i <= 10; i++) {
    arrayProducts.push(i);
  }

  return (
    <div>
      <div className="card-propose">
        <div style={{ display: "flex" }}>
          <h3>{result_gender}</h3>
          <h3>{result_age}</h3>
          <h3>{result_size}</h3>
        </div>
        {/* <DuDoan /> */}
        <h2>Sản phẩm đề xuất cho bạn</h2>
        <img className="img-propose" src={imageBase64} alt="" />

        {/* <CardProposeComponents /> */}
        <div className="products">
          <LoadingCardComponent5SP
            isLoading={isLoadingPropose || isLoading}
            arrayProducts={arrayProducts}
          >
            <Row>
              {product?.data?.map((product, index) => {
                return (
                  <Col
                    style={{ flex: "0 0 auto", width: "20%" }}
                    //   xxl={3}
                    //   xl={3}
                    key={product._id}
                  >
                    <CardComponents
                      id={product._id}
                      key={index}
                      className="card_Propose"
                      // countInstock={product.countInstock}
                      // description={product.description}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      // rating={product.rating}
                      // discount={product.discount}
                      // selled={product.selled}
                      //   gender={product.gender}
                      //   age={product.age}
                      //   size={product.size}
                      //   result_age={result_age}
                      //   result_size={result_size}
                      //   result_gender={result_gender}
                    />
                  </Col>
                );
              })}
            </Row>
          </LoadingCardComponent5SP>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
        }}
      >
        <LoadingComponents isLoading={isPreviousData} />
      </div>
      <div>
        {product?.totalPage > 1 &&
          !isPreviousData &&
          !isLoading &&
          !isLoadingPropose && (
            <div className="see-more">
              <Button
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

export default ProposePage;
