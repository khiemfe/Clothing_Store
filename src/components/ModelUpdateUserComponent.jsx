import React from "react";
import { Modal } from "react-bootstrap";
import { Form, Input } from "antd";
import { Button } from "react-bootstrap";
import { Select } from "antd";

const ModelUpdateUserComponent = ({
  stateUser,
  form,
  handleOnchange,
  onFinish,
  title,
  isPhoneNumber,
  errInput,
  tinhLabel,
  optionsTinh,
  handleChangeSelectTinh,
  huyenLabel,
  optionsHuyen,
  handleChangeSelectHuyen,
  xaLabel,
  optionsXa,
  handleChangeSelectXa,
  inputLabel,
  handleOnchangeAddress,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onFinish();
    }
  };

  return (
    <div className="modelUpdateUser">
      <Modal.Body onKeyDown={handleKeyDown}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="on"
          form={form}
        >
          <Form.Item label="Name" style={{ marginTop: "10px" }}>
            <Input
              value={stateUser?.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
          <Form.Item style={{ position: "relative" }} label="Phone">
            <Input
              value={stateUser?.phone}
              onChange={handleOnchange}
              name="phone"
            />
            {!isPhoneNumber && isPhoneNumber === null && stateUser?.phone && (
              <p style={{ color: "red", position: "absolute" }}>
                Định dạng số điện thoại sai
              </p>
            )}
          </Form.Item>
          <Form.Item label="Address" name="address">
            <div>
              <Select
                placeholder={"Tỉnh/Thành phố *"}
                value={tinhLabel}
                options={optionsTinh}
                onChange={handleChangeSelectTinh}
              />
            </div>
            <div>
              {tinhLabel ? (
                <Select
                  placeholder={"Quận/Huyện *"}
                  value={huyenLabel || undefined}
                  options={optionsHuyen}
                  onChange={handleChangeSelectHuyen}
                />
              ) : (
                <Select placeholder={"Quận/Huyện *"} disabled />
              )}
            </div>
            <div>
              {huyenLabel ? (
                <Select
                  placeholder={"Phường/Xã *"}
                  value={xaLabel || undefined}
                  options={optionsXa}
                  onChange={handleChangeSelectXa}
                />
              ) : (
                <Select placeholder={"Phường/Xã *"} disabled />
              )}
            </div>
            <Input
              placeholder={"Số nhà, đường *"}
              value={inputLabel}
              onChange={handleOnchangeAddress}
              // name="address"
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
              // type="submit"
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
            <span style={{ color: "red" }}>{errInput}</span>
          </Form.Item>
        </Form>
      </Modal.Body>
    </div>
  );
};

export default ModelUpdateUserComponent;
