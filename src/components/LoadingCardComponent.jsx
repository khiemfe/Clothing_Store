import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const LoadingCard = (props) => {
  const { key } = props;
  return (
    <div>
      <Card
        style={{ width: "18rem", height: "445px", border: "none" }}
        key={key}
      >
        <Placeholder animation="wave">
          <Placeholder
            style={{ height: "330px", backgroundColor: "#ccc", borderRadius: '10px' }}
            xs={12}
          />
        </Placeholder>
        <Card.Body>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder style={{ backgroundColor: "#999" }} xs={7} />{" "}
            <Placeholder style={{ backgroundColor: "#999" }} xs={4} />{" "}
            <Placeholder style={{ backgroundColor: "#999" }} xs={4} />{" "}
            <Placeholder style={{ backgroundColor: "#999" }} xs={6} />{" "}
            <Placeholder style={{ backgroundColor: "#999" }} xs={8} />
          </Placeholder>
          <Placeholder
            style={{ lineHeight: "30px" }}
            as={Card.Title}
            animation="glow"
          >
            <Placeholder style={{ backgroundColor: "#999" }} xs={6} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
};

const LoadingCardComponent = ({
  children,
  isLoading,
  arrayProducts,
  delay = 200,
}) => {
  console.log("lengthProducts", arrayProducts);

  return (
    <>
      {isLoading ? (
        <Row>
          {arrayProducts?.map((arrayProduct) => {
            return (
              <Col xxl={3} xl={3} key={arrayProduct}>
                <LoadingCard />
              </Col>
            );
          })}
        </Row>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export const LoadingCardComponent5SP = ({
  children,
  isLoading,
  arrayProducts,
  delay = 200,
}) => {
  console.log("lengthProducts", arrayProducts);

  return (
    <>
      {isLoading ? (
        <Row>
          {arrayProducts?.map((arrayProduct) => {
            return (
              <Col
                style={{ flex: "0 0 auto", width: "20%" }}
                // xxl={3}
                // xl={3}
                key={arrayProduct}
              >
                <LoadingCard />
              </Col>
            );
          })}
        </Row>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default LoadingCardComponent;
