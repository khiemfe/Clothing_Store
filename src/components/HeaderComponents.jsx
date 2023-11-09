import React, { useEffect, useState } from "react";
import logo from "../public/img/logo2.jpg";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { FiSearch, FiHeart } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import CameraComponents from "./CameraComponents";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import * as UserServcie from "../services/userServices";
import { resetUser } from "../redux/slices/userSlice";
import LoadingComponents from "./LoadingComponents";
import LoadingCardInfoComponent from "./LoadingCardInfoComponent";
import { searchProduct } from "../redux/slices/productSlice";

const HeaderComponents = () => {
  const item = ["nam", "nữ", "new", "best", "sale đồng giá"];

  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const user = useSelector((state) => state.user);
  console.log("userHeader", user);

  if (user?.email) {
    const dataEmail = user?.email;
    localStorage.setItem("email", JSON.stringify(dataEmail));
  }

  console.log("user", user);
  useEffect(() => {
    if (user?.access_token && user?.id === undefined) {
      localStorage.setItem("email", JSON.stringify(false));
    }
  });
  let storageEmail = localStorage.getItem("email");
  console.log("storageEmail", storageEmail);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await UserServcie.logoutUser();
    dispatch(resetUser());
    localStorage.setItem("email", JSON.stringify(false));
    // localStorage.setItem("access_token", JSON.stringify(false));
    setLoading(false);
  };

  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  console.log("user?.name", user?.name);
  console.log("storageEmail", storageEmail);

  const [value, setValue] = useState("");

  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    setSearch(e.target.value);
    setValue(e.target.value);
  };

  const searchStorage = localStorage.getItem("search");

  const BtnSearchProduct = () => {
    dispatch(searchProduct(search));
    if (search.trim()) {
      if (search.trim() !== searchStorage.trim()) {
        navigate("/product-search");
        localStorage.setItem("search", search);
        console.log("searchsearch", search);
        setValue("");
      } else {
        navigate("/product-search");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      BtnSearchProduct();
    }
  };

  return (
    <Navbar className=" justify-content-between header ">
      <Toaster />
      <Container>
        <Row className="align-items_center">
          <Col xxl={1} xl={1}>
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" className="logo" />
            </Navbar.Brand>
          </Col>
          <Col xxl={5} xl={5} className="center align-items_center">
            <Nav className="me-auto">
              {item.map((i, index) => {
                return (
                  <Nav.Link key={index} className="item" href="/nam">
                    {i}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Col>
          <Col xxl={6} xl={6} className="right ">
            <Form className="d-flex form align-items_center">
              <CameraComponents />
              <div className="search">
                <Button
                  variant="outline-success"
                  className="align-items_center"
                  onClick={BtnSearchProduct}
                >
                  <FiSearch />
                </Button>
                <Form.Control
                  // type="search"
                  value={value}
                  placeholder="Tìm kiếm"
                  className="me-2"
                  aria-label="Search"
                  onChange={onSearch}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <FiHeart className="icon heart" />
              <Button className="btn-cart">
                <Badge bg="warning">9</Badge>
                <BsCart2 className="icon cart" />
              </Button>
              <div className="info-user">
                {/* <LoadingComponents isLoading={loadingInfo}> */}
                {user?.email ? (
                  <Dropdown style={{ width: "70px" }}>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      {userAvatar ? (
                        <img
                          className="avatar"
                          src={userAvatar}
                          alt="avatar"
                          style={{ width: "50px" }}
                        />
                      ) : (
                        <img
                          className="avatar"
                          src=""
                          alt=""
                          style={{ width: "50px" }}
                        />
                        // undefined
                      )}
                      <div className="textName">
                        {/* {userName || user.email || "User"} */}
                        {userName || user.email?.split("@")[0]}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ left: "-60%", fontSize: "13px" }}>
                      {user?.isAdmin && (
                        <Dropdown.Item href="/system/admin">
                          Trang chủ ADMIN
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item href="/profile-user">
                        Thông tin người dùng
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <LoadingComponents isLoading={loading}>
                        <Dropdown.Item onClick={handleLogout} href="#">
                          Đăng xuất
                        </Dropdown.Item>
                      </LoadingComponents>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                    {storageEmail && storageEmail !== "false" ? (
                      <div>
                        <LoadingCardInfoComponent
                        // isLoading={true}
                        ></LoadingCardInfoComponent>
                      </div>
                    ) : (
                      <Button
                        onClick={handleNavigateLogin}
                        className="btn-sign"
                        variant=""
                      >
                        Đăng nhập <br /> Đăng ký
                      </Button>
                    )}
                  </>
                )}
                {/* </LoadingComponents> */}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default HeaderComponents;
