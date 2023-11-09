import React, { useEffect, useState } from "react";
import ProposeComponents from "../components/ProposeComponents";
import Button from "react-bootstrap/Button";
import { useQuery } from "@tanstack/react-query";
import * as ProductServices from "../services/ProductServices";
import CardProposeComponents from "../components/CardProposeComponents";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { LoadingCardComponent5SP } from "../components/LoadingCardComponent";
import LoadingComponents from "../components/LoadingComponents";

const ProposePage = () => {
  const imgStorage = localStorage.getItem("img");
  const imageBase64 = JSON.parse(imgStorage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (!isLoaded) {
      axios
        .post("/save", {
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

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    console.log("limit", limit);
    const res = await ProductServices.getAllProduct("", limit);
    return res;
  };

  const [result_age, set_result_age] = useState("");
  const [result_bmi, set_result_bmi] = useState("");
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
      set_result_bmi(arr[2]);
    };
    arrResult();
  }, []);

  let {
    isLoading,
    data: product,
    isPreviousData,
  } = useQuery(["product", limit], fetchProductAll, {
    retry: 3,
    keepPreviousData: true,
  });
  console.log("productproduct", product);

  if (result_gender === "" && result_age === "" && result_bmi === "") {
    isLoading = true;
    product = undefined;
  }

  console.log("gender", result_gender);
  console.log("age", result_age);
  console.log("bmi", result_bmi);

  let lengthProducts = 10;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  let soluongProducts = product?.data.length;
  let soluongPage = Math.ceil(product?.totalProduct / soluongProducts);
  if (product?.data.length === 0) {
    soluongPage = 1;
  }

  return (
    <div>
      <div className="card-propose">
        {/* <DuDoan /> */}
        <h2>Sản phẩm đề xuất cho bạn</h2>
        <img className="img-propose" src={imageBase64} alt="" />

        {/* <CardProposeComponents /> */}
        <div className="products">
          <LoadingCardComponent5SP
            isLoading={isLoading}
            arrayProducts={arrayProducts}
          >
            <Row>
              {product?.data?.map((product, index) => {
                return (
                  <CardProposeComponents
                    id={product._id}
                    key={index}
                    className="card_Propose"
                    // countInstock={product.countInstock}
                    // description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    // rating={product.rating}
                    type={product.type}
                    // discount={product.discount}
                    // selled={product.selled}
                    age={product.age}
                    bmi={product.bmi}
                    result_age={result_age}
                    result_bmi={result_bmi}
                    result_gender={result_gender}
                  />
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
        {product?.totalPage !== 1 &&
          soluongPage !== 1 &&
          !isPreviousData &&
          !isLoading && (
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
