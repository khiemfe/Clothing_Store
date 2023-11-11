import React, { useEffect, useRef, useState } from "react";
import * as ProductServices from "../services/ProductServices";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { LoadingCardComponent5SP } from "../components/LoadingCardComponent";
import { Col, Row } from "react-bootstrap";
import CardComponents from "../components/CardComponents";
import Button from "react-bootstrap/Button";
import LoadingComponents from "../components/LoadingComponents";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "../redux/slices/productSlice";
import Form from "react-bootstrap/Form";

const ProductSearchPage = () => {
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState();
  const searchStorage = localStorage.getItem("search");
  console.log("searchStorage", searchStorage);

  const fetchProductAll = async (context) => {
    console.log("contextcontext", context);
    const limit = context?.queryKey && context?.queryKey[1];
    const search = (context?.queryKey && context?.queryKey[2]) || searchStorage;
    setTextSearch(search);
    console.log("contextsearch", search);
    console.log("limit", limit);
    const res = await ProductServices.getAllProduct(search, limit);
    return res;
  };

  const searchProductRedux =
    useSelector((state) => state.product?.search) || searchStorage || undefined;
  console.log("productSearch", searchProductRedux);

  const searchDebounce = useDebounce(searchProductRedux, 1000);

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
    if (
      products?.noProduct?.split(":")[1]?.trim() !== searchProductRedux?.trim()
    ) {
      setIsLoading(true);
    } else {
      console.log("===");
      setIsLoading(false);
    }
  });
  console.log("datadata", products);
  console.log("datadata1", products?.noProduct?.split(":")[1]?.trim());
  console.log("datadata2", searchProductRedux?.trim());
  console.log("isLoading", isLoading);

  let lengthProducts = 10;
  const arrayProducts = [];

  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }

  let soluongProducts = products?.data.length;
  //   let soluongPage = Math.ceil(products?.totalProduct / soluongProducts);
  let soluongPage = products?.data.totalPage;
  if (products?.data.length === 0) {
    soluongPage = 1;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  // search ở trên
  useEffect(() => {
    console.log("searchStorage", searchStorage);
    setSearchParams({ search: `${searchStorage}` });
  }, [textSearch]);

  useEffect(() => {
    setSearch(searchStorage);
  }, [searchStorage]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch(searchStorage);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search.trim()) {
        console.log("validate", search);
        dispatch(searchProduct(search));
        localStorage.setItem("search", search);
        setSearchParams({ search: `${search}` });
      }
    }
  };

  return (
    <div className="search-page">
      <p className="title">
        Sản phẩm cho từ khoá tìm kiếm:{" "}
        <Form.Control
          className="input"
          onChange={onSearch}
          value={search}
          onKeyDown={handleKeyDown}
        />
      </p>
      <div className="product">
        <LoadingCardComponent5SP
          isLoading={isLoading || isLoadingAll}
          arrayProducts={arrayProducts}
          //   width={}
        >
          <Row>
            {products?.data?.map((product) => {
              console.log("productmap", product);
              return (
                <Col
                  style={{ flex: "0 0 auto", width: "20%" }}
                  //   xxl={3}
                  //   xl={3}
                  key={product._id}
                >
                  {/* <a href="/product-details"> */}
                  <CardComponents
                    id={product._id}
                    // countInstock={product.countInstock}
                    // description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    // rating={product.rating}
                    gender={product.gender}
                    // discount={product.discount}
                    // selled={product.selled}
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

export default ProductSearchPage;
