import React, { useEffect } from "react";
import LoadingComponents from "./LoadingComponents";
import { Modal } from "react-bootstrap";
import { Form, Input } from "antd";
import { Button } from "react-bootstrap";
import { useMutationHook } from "../hooks/useMutationHook";
import * as OTPServices from "../services/OTPServices";
import { success, error, warning } from "../components/Message";

const ModelQMKComponent = ({
  stateUser,
  form,
  handleOnchange,
  onFinish,
  isLoading,
  title,
  dataUpdate
}) => {
  console.log('stateUser', stateUser)
  const mutationOTP = useMutationHook((email) => OTPServices.createrOTP(email));
  const {
    data: dataOTP,
    isLoading: isLoadingOTP,
    isSuccess: isSuccessOTP,
    isError: isErrorOTP,
  } = mutationOTP;
  const mutationDeleteOTP = useMutationHook((email) =>
    OTPServices.deleteOTP(email)
  );
  const handleCreateOTP = (e) => {
    e.preventDefault()
    mutationOTP.mutate({
      email: stateUser?.email,
    });
  };
  console.log('dataOTP', dataOTP)

  const handleDeleteOTP = () => {
    mutationDeleteOTP.mutate({
      email: stateUser?.email,
    });
  };
  useEffect(() => {
    if (isSuccessOTP && dataOTP?.status !== "ERR") {
      success("Đã gửi mã OTP thành công cho email của bạn");
      setTimeout(() => {
        handleDeleteOTP();
      }, 300000);
    } else if (isErrorOTP) {
      error("Đã gửi mã OTP thất bại cho email của bạn");
    }
  }, [isSuccessOTP, isErrorOTP]);
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
          label="Email"
          name="email"
          style={{ marginTop: "10px" }}
        >
          <Input
            value={stateUser?.email}
            onChange={handleOnchange}
            name="email"
          />
        </Form.Item>
       
        <Form.Item
          label="Mã OTP"
          name="otp"
        >
          <Input value={stateUser?.otp} onChange={handleOnchange} name="otp" />
          <button
            style={{
              position: "absolute",
              right: 0,
              backgroundColor: "#000",
              color: "#fff",
              height: "100%",
            }}
            onClick={handleCreateOTP}
          >
            Gửi OTP
          </button>
          
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
        >
          <Input
            value={stateUser?.password}
            onChange={handleOnchange}
            name="password"
            type="password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
        >
          <Input
            value={stateUser?.confirmPassword}
            onChange={handleOnchange}
            name="confirmPassword"
            type="password"
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

        {dataUpdate?.status === 'ERR' && (
          <p style={{color: 'red'}}>{dataUpdate?.message}</p>
        )}
      </Form>
      <div className="loading">
        <LoadingComponents isLoading={isLoading}></LoadingComponents>
      </div>
    </Modal.Body>
  );
};

export default ModelQMKComponent;
