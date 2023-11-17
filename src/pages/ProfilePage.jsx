import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import * as UserServcie from "../services/userServices";
import { useMutationHook } from "../hooks/useMutationHook";
import LoadingComponents from "../components/LoadingComponents";
import { success, error, warning } from "../components/Message";
import { updateUser } from "../redux/slices/userSlice";
import { getBase64 } from "../utils";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";

let check = 0
const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rest } = data;
    console.log("rest", rest);
    const res = UserServcie.updateUser(id, rest, access_token);
    return res
  });
  const { data, isLoading, isSuccess, isError, variables } = mutation;
  console.log("dataup", mutation);

  console.log('check', check)
  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      success();
      console.log('okchay')
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      error();
    }
  }, [isSuccess, isError, check]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserServcie.getDetailsUser(id, token);
    console.log("rest ...res?.data", res);
    dispatch(
      updateUser({
        ...res?.data,
        name: variables?.name,
        email: variables?.email,
        phone: variables?.phone,
        avatar: variables?.avatar,
        address: variables?.address,
        access_token: token,
        refreshToken
      })
    );
  };

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  console.log(avatar);

  const handleUpdate = () => {
    check += 1
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
    console.log("updatee", user?.id, name, email, phone, address, avatar);
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    handleUpdate();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div>
      <h1
        style={{
          textTransform: "uppercase",
          margin: "30px 0 40px 0",
          textAlign: "center",
        }}
      >
        Thông tin người dùng
      </h1>
      <LoadingComponents isLoading={isLoading}>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="formProfile"
        >
          <Row className="mb-3 rowProfile">
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <div
                style={{ position: "relative", height: "100px" }}
                className="item"
              >
                <Form.Label>Avatar:</Form.Label>
                <Upload
                  name="image"
                  onChange={handleOnchangeAvatar}
                  maxCount={1}
                  // style={{position:'relative', marginBottom:'20px'}}
                >
                  <Button
                    icon={<UploadOutlined />}
                    style={{
                      margin: "0",
                      backgroundColor: "transparent",
                      borderColor: "#000",
                      position: "absolute",
                      top: "0px",
                      left: "50%",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  >
                    <GrAdd />
                  </Button>
                </Upload>
                {avatar && (
                  <Upload
                    name="image"
                    onChange={handleOnchangeAvatar}
                    maxCount={1}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        margin: "0",
                        backgroundColor: "transparent",
                        borderColor: "#000",
                        position: "absolute",
                        top: "0px",
                        left: "50%",
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={avatar}
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
              </div>
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <div className="item">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  // required
                  value={name}
                  type="text"
                  onChange={handleOnchangeName}
                  placeholder="Name?"
                />
              </div>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <div className="item">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  // required
                  value={email}
                  type="email"
                  onChange={handleOnchangeEmail}
                  placeholder="email@gmail.com"
                />
              </div>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <div className="item">
                <Form.Label>Phone:</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    value={phone}
                    type="number"
                    onChange={handleOnchangePhone}
                    placeholder="Phone?"
                    // required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-3 rowProfile">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <div className="item">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  value={address}
                  type="text"
                  onChange={handleOnchangeAddress}
                  placeholder="Address"
                  // required
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* <Button type="submit">Submit form</Button> */}
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button className="submit" onClick={handleUpdate}>
              Update form
            </Button>
          </div>
        </Form>
      </LoadingComponents>
    </div>
  );
};

export default ProfilePage;
