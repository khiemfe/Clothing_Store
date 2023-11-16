import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const FooterComponent = () => {
  return (
    <div className="footer">
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        {/* <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              textAlign: 'right',
              width: "100%"
            }}
          >
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>
            <div className="networks">
              <a href="" className="me-4 text-reset">
                <FaFacebook />
              </a>
              <a href="" className="me-4 text-reset">
                <FaTwitter />
              </a>
              <a href="" className="me-4 text-reset">
                <FaGoogle />
              </a>
              <a href="" className="me-4 text-reset">
                <FaInstagram />
              </a>
              <a href="" className="me-4 text-reset">
                <FaLinkedin />
              </a>
              <a href="" className="me-4 text-reset">
                <FaGithub />
              </a>
            </div>
          </div>
        {/* </section> */}

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    NodeJS
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    ReactJS
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    MONGODB
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Da Nang
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  khiemtrinh255@gmail.com
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> + 0353454***
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023
          <a
            style={{ marginLeft: "5px" }}
            className="text-reset fw-bold"
            href="http://localhost:3000/"
          >
            Five Man Store
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default FooterComponent;
