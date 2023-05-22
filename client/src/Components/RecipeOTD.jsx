import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./../App.css";
import TimerImg from "./../timer.svg";
import HeartImg from "./../heart.svg";
import SaveImg from "./../save.svg";
import Instructions from "./Instructions";

function RecipeOTD({
  sourceUrl,
  image,
  dishType,
  summary,
  title,
  readyInMinutes,
  aggregateLikes,
  analyzedInstructions,
  extendedIngredients,
}) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Card
        as="RecipeOTD"
        style={{
          width: "700px",
          height: "850px",
          border: 0,
          borderRadius: 0,
          backgroundColor: "#FFFCF3",
        }}
      >
        <Card.Img
          variant="top"
          alt={title}
          src={image}
          style={{ borderRadius: 0, padding: "50px", paddingBottom: 15 }}
        />{" "}
        {/* Replace with "image" from api */}
        <Card.Body>
          <Card.Subtitle id="center" as="subtext" margin="10px">
            RECIPE OF THE DAY
          </Card.Subtitle>{" "}
          {/* Replace with "dishType" from api */}
          <div></div>
          <Card.Title id="center" as="recipeTitleOTD" margin="10px">
            {title}
          </Card.Title>{" "}
          {/* Replace with "title" from api */}
          <Card.Text id="center"></Card.Text>
          <Container fluid>
            <Row id="bottomBarOTD">
              <Col
                id="bottomBarLeft"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  id="svg"
                  alt="timer svg"
                  src={TimerImg}
                  width="20"
                  verticalAlign="center"
                />
                {readyInMinutes} mins
              </Col>
              <Col
                id="bottomBarCenter"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  id="linkOTD"
                  onClick={() => setModalShow(true)}
                  variant="link"
                >
                  GET THE RECIPE {">"}
                </Button>
              </Col>
              <Col
                id="bottomBarRight"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img id="svg" alt="heart svg" src={HeartImg} height="22" />
                {aggregateLikes}
                <img id="svg" alt="bookmark svg" src={SaveImg} height="18" />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      <Instructions
        show={modalShow}
        onHide={() => setModalShow(false)}
        sourceUrl={sourceUrl}
        image={image}
        dishType={dishType}
        title={title}
        readyInMinutes={readyInMinutes}
        aggregateLikes={aggregateLikes}
        analyzedInstructions={analyzedInstructions}
        extendedIngredients={extendedIngredients}
      />
    </>
  );
}

export default RecipeOTD;
