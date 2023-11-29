import React from "react";
import LoadingComponents from "./LoadingComponents";
import { Modal } from "react-bootstrap";
import { Form, Input } from "antd";
import { Button } from "react-bootstrap";

const ModelUpdateUserComponent = ({
  stateUser,
  form,
  handleOnchange,
  onFinish,
  isLoading,
  title,
  isPhoneNumber,
}) => {
  console.log("isPhoneNumber", isPhoneNumber);
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
        autoComplete="on"
        form={form}
      >
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
            value={stateUser?.name}
            onChange={handleOnchange}
            name="name"
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input
            value={stateUser?.phone}
            onChange={handleOnchange}
            name="phone"
          />
          {!isPhoneNumber && isPhoneNumber === null && stateUser?.phone && (
            <p style={{ color: "red" }}>Định dạng số điện thoại sai</p>
          )}
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input
            value={stateUser?.address}
            onChange={handleOnchange}
            name="address"
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

export default ModelUpdateUserComponent;
