import React, { useEffect, useState } from "react";
import LoadingComponents from "./LoadingComponents";
import { Modal } from "react-bootstrap";
import { Form, Input, Upload } from "antd";
import { Button } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import Select from "react-select";

const ModelBodyComponent = ({
  stateProduct,
  form,
  handleOnchange,
  handleChangeSelect,
  options,
  typeSelect,
  placeholder,
  handleOnchangeAvatar,
  onFinish,
  isLoading,
  title,
}) => {
  console.log("stateProducttt", stateProduct);
  console.log("handleOnchange", handleOnchange);

  const [sizeS, setSizeS] = useState(stateProduct?.quantity?.sizeS || 0);
  const [sizeM, setSizeM] = useState(stateProduct?.quantity?.sizeM || 0);
  const [sizeL, setSizeL] = useState(stateProduct?.quantity?.sizeL || 0);
  const [sizeXL, setSizeXL] = useState(stateProduct?.quantity?.sizeXL || 0);

  const handleOnchageQuantityS = (e) => {
    setSizeS(e.target.value);
    stateProduct.quantity.sizeS = e.target.value;
  };
  const handleOnchageQuantityM = (e) => {
    setSizeM(e.target.value);
    stateProduct.quantity.sizeM = e.target.value;
  };
  const handleOnchageQuantityL = (e) => {
    setSizeL(e.target.value);
    stateProduct.quantity.sizeL = e.target.value;
  };
  const handleOnchageQuantityXL = (e) => {
    setSizeXL(e.target.value);
    stateProduct.quantity.sizeXL = e.target.value;
  };

  useEffect(() => {
    if (sizeS && sizeS < 0) {
      setSizeS(0);
    } else if (sizeM && sizeM < 0) {
      setSizeM(0);
    } else if (sizeL && sizeL < 0) {
      setSizeL(0);
    } else if (sizeXL && sizeXL < 0) {
      setSizeXL(0);
    }
  }, [sizeS, sizeM, sizeL, sizeXL]);

  // const [requiredSizeS, setRequiredSizeS] = useState(true);
  // const [requiredSizeM, setRequiredSizeM] = useState(true);
  // const [requiredSizeL, setRequiredSizeL] = useState(true);
  // const [requiredSizeXL, setRequiredSizeXL] = useState(true);

  // useEffect(() => {
  //   if (sizeS) {
  //     setRequiredSizeS(false);
  //   } else {
  //     setRequiredSizeS(true);
  //   }
  // }, [sizeS]);

  // useEffect(() => {
  //   if (sizeM) {
  //     setRequiredSizeM(false);
  //   } else {
  //     setRequiredSizeM(true);
  //   }
  // }, [sizeM]);

  // useEffect(() => {
  //   if (sizeL) {
  //     setRequiredSizeL(false);
  //   } else {
  //     setRequiredSizeL(true);
  //   }
  // }, [sizeL]);

  // useEffect(() => {
  //   if (sizeXL) {
  //     setRequiredSizeXL(false);
  //   } else {
  //     setRequiredSizeXL(true);
  //   }
  // }, [sizeXL]);

  return (
    <Modal.Body>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        //   onFinish={onFinish}
        // //   onFinishFailed={onFinishFailed}
        autoComplete="on"
        form={form}
      >
        <Form.Item
          label="Image"
          name="upload"
          valuePropName="fileList"
          rules={[
            {
              required: true,
              message: stateProduct?.image ? "" : "Please input your image!",
            },
          ]}
          style={{ lineHeight: "80px" }}
        >
          <Upload
            name="image"
            onChange={handleOnchangeAvatar}
            maxCount={1}
            // style={{position:'relative', marginBottom:'20px'}}
          >
            <Button
              icon={<UploadOutlined />}
              style={{
                margin: "0 10px",
                backgroundColor: "transparent",
                borderColor: "#000",
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "80px",
                height: "80px",
              }}
            >
              <GrAdd />
            </Button>
          </Upload>
          {stateProduct?.image && (
            <Upload name="image" onChange={handleOnchangeAvatar} maxCount={1}>
              <Button
                icon={<UploadOutlined />}
                style={{
                  margin: "0 10px",
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "80px",
                  height: "80px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={stateProduct?.image}
                  alt="image"
                  style={{
                    objectFit: "cover",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          style={{ marginTop: "10px" }}
        >
          <Input
            value={stateProduct.name}
            onChange={handleOnchange}
            name="name"
          />
        </Form.Item>
        {/* name, image, type, price, countInStock, rating, description */}
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please input your size gender!",
            },
          ]}
        >
          <Input
            value={stateProduct.gender}
            onChange={handleOnchange}
            name="gender"
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <Input
            value={stateProduct.price}
            onChange={handleOnchange}
            name="price"
          />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "Please input your age!",
            },
          ]}
        >
          <Input
            value={stateProduct.age}
            onChange={handleOnchange}
            name="age"
          />
        </Form.Item>
        <Form.Item label="Quantity">
          <div style={{ display: "flex" }}>
            <Form.Item
              label="S: "
            >
              <Input
                value={sizeS}
                onChange={handleOnchageQuantityS}
                name="sizeS"
                type="number"
                min="0"
              />
            </Form.Item>
            <Form.Item label="M: ">
              <Input
                value={sizeM}
                onChange={handleOnchageQuantityM}
                // name="sizeM"
                type="number"
                min="0"
              />
            </Form.Item>
            <Form.Item
              label="L: "
            >
              <Input
                value={sizeL}
                onChange={handleOnchageQuantityL}
                // name="sizeL"
                type="number"
                min="0"
              />
            </Form.Item>
            <Form.Item
              label="XL: "
            >
              <Input
                value={sizeXL}
                onChange={handleOnchageQuantityXL}
                // name="sizeXL"
                type="number"
                min="0"
              />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="Size"
          name="size"
          rules={[
            {
              required: true,
              message: "Please input your size!",
            },
          ]}
        >
          <Input
            value={stateProduct.size}
            onChange={handleOnchange}
            name="size"
          />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <div className="App">
            <Select
              name="type"
              placeholder={placeholder || ""}
              // defaultValue={stateProduct.type}
              onChange={handleChangeSelect}
              options={options}
            />
            {typeSelect === "add_type" && (
              <Input
                value={stateProduct.type}
                onChange={handleOnchange}
                placeholder="Nhập type bạn muốn thêm"
                name="type"
              />
            )}
          </div>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            onClick={onFinish}
            type="submit"
            className="submit_btn"
            style={{
              padding: "10px 24px",
              float: "right",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              fontSize: "14px",
            }}
          >
            {title}
          </Button>
        </Form.Item>
      </Form>
      <div className="loading">
        <LoadingComponents isLoading={isLoading}></LoadingComponents>
      </div>
    </Modal.Body>
  );
};

export default ModelBodyComponent;
