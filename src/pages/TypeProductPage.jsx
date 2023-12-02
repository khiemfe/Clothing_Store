import React, { useEffect, useState } from "react";
import NavbarComponents from "../components/NavbarComponents";
import CardComponents from "../components/CardComponents";
import { Pagination } from "antd";
import { useLocation } from "react-router-dom";
import * as ProductServices from "../services/ProductServices";
import LoadingCardComponent from "../components/LoadingCardComponent";
import { Col, Row } from "react-bootstrap";

const TypeProductPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 2,
    total: 1,
  });

  const fetchTypeProduct = async (type, page, limit) => {
    setIsLoading(true);
    const res = await ProductServices.getTypeProduct(type, page, limit);
    console.log("reees", res);
    if (res?.status === "OK") {
      setIsLoading(false);
      setProducts(res?.data);
      setPanigate({ ...panigate, total: res?.totalProduct });
    } else {
      setIsLoading(false);
    }
    // return res?.data
  };
  console.log("productss", products);
  useEffect(() => {
    if (state) {
      fetchTypeProduct(state, panigate?.page, panigate?.limit);
    }
  }, [state, panigate?.page, panigate?.limit]);

  const onChangePa = (current, pageSize) => {
    console.log("current", current, pageSize);
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

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
  //   console.log("arrTypee", arrType);

  let lengthProducts = panigate?.limit;
  const arrayProducts = [];
  for (let i = 1; i <= lengthProducts; i++) {
    arrayProducts.push(i);
  }
  return (
    <div style={{ padding: "0 52px", marginTop: 110 }}>
      <Row className="content">
        <Col xxl={2} xl={2} className="_navbar">
          <div style={{ position: "fixed" }}>
            <NavbarComponents arrType={arrType} />
          </div>
        </Col>
        <Col xxl={10} xl={10}>
          <LoadingCardComponent
            isLoading={isLoading}
            arrayProducts={arrayProducts}
          >
            <Row>
              {products?.map((product) => {
                console.log("productmap", product);
                return (
                  <Col xxl={3} xl={3} key={product._id}>
                    <CardComponents
                      id={product._id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      gender={product.gender}
                      age={product.age}
                      size={product.size}
                    />
                  </Col>
                );
              })}
              <Pagination
                style={{ textAlign: "center", marginTop: '10px'}}
                onChange={onChangePa}
                defaultCurrent={panigate?.page + 1}
                defaultPageSize={panigate?.limit}
                total={panigate?.total}
                pageSizeOptions={[2, 4, 6]}
              />
              ;
            </Row>
          </LoadingCardComponent>
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
