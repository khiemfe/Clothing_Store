import React from "react";
import LoadingComponents from "./LoadingComponents";
import { Modal } from "react-bootstrap";
import { Form, Input, Upload } from "antd";
import { Button } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";

const ModelBodyComponent = ({
  stateProduct,
  form,
  handleOnchange,
  handleOnchangeAvatar,
  onFinish,
  isLoading,
  title,
}) => {
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
              message: "Please input your gender!",
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
