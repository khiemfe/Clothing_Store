import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingType = (props) => {
  const { key } = props;
  return (
    <div>
      <Card style={{ height: "auto", border: "none" }} key={key}>
        <Placeholder animation="wave">
          <Placeholder
            style={{
              width: "850px",
              height: "280px",
              backgroundColor: "#ddd",
            }}
            xs={12}
          />
        </Placeholder>
      </Card>
    </div>
  );
};

const LoadingTypeComponent = ({ children, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Row>
          <Col xxl={3} xl={3}>
            <LoadingType />
          </Col>
        </Row>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default LoadingTypeComponent;
