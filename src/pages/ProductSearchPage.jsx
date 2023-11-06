import React, { useEffect, useState } from "react";
import * as ProductServices from "../services/ProductServices";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import LoadingCardComponent from "../components/LoadingCardComponent";
import { Col, Row } from "react-bootstrap";
import CardComponents from "../components/CardComponents";
import Button from "react-bootstrap/Button";
import LoadingComponents from "../components/LoadingComponents";

const ProductSearchPage = () => {
  const [textSearch, setTextSearch] = useState("");
  const [limit, setLimit] = useState(8);

  const fetchProductAll = async (context) => {
    console.log("contextcontext", context);
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    setTextSearch(search);
    console.log("contextsearch", search);
    console.log("limit", limit);
    const res = await ProductServices.getAllProduct(search, limit);
    return res;
  };

  const searchProduct =
    useSelector((state) => state.product?.search) || undefined;
  console.log("productSearch", searchProduct);

  const searchDebounce = useDebounce(searchProduct, 1000);

  const [isLoading, setIsLoading] = useState(false);
  const {
    isLoading: isLoadingAll,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  useEffect(() => {
    if (products?.noProduct?.split(":")[1]?.trim() !== searchProduct?.trim()) {
      setIsLoading(true);
    } else {
      console.log("===");
      setIsLoading(false);
    }
  });
  console.log("datadata", products);
  console.log("datadata1", products?.noProduct?.split(":")[1]?.trim());
  console.log("datadata2", searchProduct?.trim());
  console.log("isLoading", isLoading);

  let lengthProducts = 28;
  const arrayProducts = [];

  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  let soluongProducts = products?.data.length;
  let soluongPage = Math.ceil(products?.totalProduct / soluongProducts);
  if (products?.data.length === 0) {
    soluongPage = 1;
  }

  return (
    <div className="search-page">
      <p>
        Sản phẩm cho từ khoá tìm kiếm: <span>{textSearch}</span>
      </p>
      <div className="product">
        <LoadingCardComponent
          isLoading={isLoading || isLoadingAll}
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
                  />
                  {/* </a> */}
                </Col>
              );
            })}
          </Row>
        </LoadingCardComponent>
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
        {products?.totalPage !== 1 &&
          soluongPage !== 1 &&
          !isPreviousData &&
          !isLoadingAll && (
            <div className="see-more">
              <Button
                onClick={() => setLimit((prev) => prev + 8)}
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

export default ProductSearchPage;
