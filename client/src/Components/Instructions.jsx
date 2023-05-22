import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./../App.css";
import TimerImg from "./../timer.svg";
import HeartImg from "./../heart.svg";
import SaveImg from "./../save.svg";

function Instructions({
  show,
  onHide,
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
  const saveRecipe = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:4000/user/add",
        { item: id },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const deleteRecipe = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:4000/user/delete",
        { item: id },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Modal
      id="modal"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title as="recipeTitle">{title}</Modal.Title>
      </Modal.Header>
      <img alt={title} src={image} />
      <Modal.Body>
        <recipeTitle>Ingredients</recipeTitle>
        <ul>
          {extendedIngredients.map((ing) => (
            <li style={{ margin: "10px" }}>
              {ing.amount} {ing.unit} {ing.nameClean}
            </li>
          ))}
        </ul>
        <recipeTitle>Instructions</recipeTitle>
        <ol>
          {analyzedInstructions.map((inst) => (
            <li style={{ margin: "10px" }}>{inst.step}</li>
          ))}
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Container fluid>
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
              <Button
                variant="link"
                id="saveBtn"
                onClick={shouldSave === true ? saveRecipe : deleteRecipe}
              >
                <img id="svg" alt="bookmark svg" src={SaveImg} height="18" />
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default Instructions;
