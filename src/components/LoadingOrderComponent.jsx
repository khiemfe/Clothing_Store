// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import React from "react";
// import Card from "react-bootstrap/Card";
// import Placeholder from "react-bootstrap/Placeholder";

// const LoadingOrder = (props) => {
//   const { key } = props;
//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "1650px",
//         justifyContent: "space-between",
//         alignItems: "end",
//         marginLeft: 200,
//       }}
//     >
//       <Card style={{ height: "auto", border: "none" }} key={key}>
//         <Placeholder animation="wave">
//           <Placeholder
//             style={{
//               width: "740px",
//               height: "140px",
//               backgroundColor: "#ccc",
//             }}
//             xs={12}
//           />
//         </Placeholder>
//         <Placeholder animation="wave">
//           <Placeholder
//             style={{
//               width: "740px",
//               height: "140px",
//               backgroundColor: "#ccc",
//               marginTop: 20,
//               marginBottom: 30
//             }}
//             xs={12}
//           />
//         </Placeholder>
//       </Card>
//       <Card style={{}}>
//         <Card.Body >
//           <Placeholder
//             style={{ lineHeight: "25px" }}
//             as={Card.Title}
//             animation="glow"
//           >
//             <Placeholder
//               style={{ backgroundColor: "#999", height: 25 }}
//               xs={6}
//             />
//           </Placeholder>

//           <Placeholder
//             style={{ lineHeight: "25px" }}
//             as={Card.Title}
//             animation="glow"
//           >
//             <Placeholder
//               style={{ backgroundColor: "#999", height: 25 }}
//               xs={6}
//             />
//           </Placeholder>

//           <Placeholder
//             style={{ lineHeight: "25px" }}
//             as={Card.Title}
//             animation="glow"
//           >
//             <Placeholder
//               style={{ backgroundColor: "#999", height: 25 }}
//               xs={6}
//             />
//           </Placeholder>

//           <Placeholder
//             style={{
//               flex: 1,
//               width: 400,
//               marginTop: 20,
//               display: "flex",
//               justifyContent: "center",
//             }}
//             as={Card.Title}
//             animation="glow"
//           >
//             <Placeholder
//               style={{ backgroundColor: "#999", height: 50 }}
//               xs={4}
//             />
//           </Placeholder>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// const LoadingOrderComponent = ({ children, isLoading }) => {
//   return (
//     <>
//       {isLoading ? (
//         <Row>
//           <Col xxl={3} xl={3}>
//             <LoadingOrder />
//           </Col>
//         </Row>
//       ) : (
//         <div>{children}</div>
//       )}
//     </>
//   );
// };

// export default LoadingOrderComponent;
