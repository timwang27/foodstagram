import React from "react";
import Card from "react-bootstrap/Card";
import Instructions from "./Instructions";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./../App.css";
import TimerImg from "./../timer.svg";
import HeartImg from "./../heart.svg";
import SaveImg from "./../save.svg";

function RecipeCard({
  sourceUrl,
  image,
  dishType = "RECIPE",
  title,
  readyInMinutes,
  aggregateLikes,
  analyzedInstructions,
  extendedIngredients,
  id,
  shouldSave,
}) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button
        id="RecipeCardLink"
        onClick={() => setModalShow(true)}
        variant="link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card
          as="RecipeCard"
          style={{ width: "300px", height: "400px", borderRadius: 0 }}
        >
          <Card.Img
            variant="top"
            alt={title}
            src={image}
            style={{ borderRadius: 0 }}
          />{" "}
          {/* Replace with "image" from api */}
          <Card.Body>
            <Card.Subtitle as="subtext" margin="10px">
              {dishType}
            </Card.Subtitle>{" "}
            {/* Replace with "dishType" from api */}
            <div></div>
            <Card.Title as="recipeTitle" margin="10px">
              {title}
            </Card.Title>{" "}
            {/* Replace with "title" from api */}
            <Container id="bottomBar" fluid>
              <Row>
                <Col
                  id="bottomBarLeft"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    marginLeft: 0,
                  }}
                >
                  <img
                    id="svg"
                    alt="timer svg"
                    src={TimerImg}
                    width="20"
                    verticalAlign="middle"
                  />
                  {readyInMinutes} mins
                </Col>
                <Col
                  id="bottomBarRight"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  <img id="svg" alt="heart svg" src={HeartImg} width="22" />
                  {aggregateLikes}
                  <img id="svg" alt="bookmark svg" src={SaveImg} height="18" />
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Button>
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
        id={id}
        shouldSave={shouldSave}
      />
    </>
  );
}

export default RecipeCard;
