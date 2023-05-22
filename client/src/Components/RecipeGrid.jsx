import RecipeCard from "./RecipeCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./../App.css";

function RecipeGrid(props) {
  if (props.recipes) {
    return (
      <Container fluid="md">
        <Row md="4">
          <>
            {props.recipes.map((r) => (
              <Col>
                <RecipeCard
                  sourceUrl={r.sourceUrl}
                  image={r.image}
                  dishType={r.dishTypes[0] && r.dishTypes[0].toUpperCase()}
                  title={r.title}
                  readyInMinutes={r.readyInMinutes}
                  aggregateLikes={r.aggregateLikes}
                  analyzedInstructions={
                    r.analyzedInstructions[0] === undefined
                      ? ["No instructions given"]
                      : r.analyzedInstructions[0].steps
                  }
                  extendedIngredients={r.extendedIngredients}
                  id={r.id}
                  shouldSave={props.shouldSave}
                ></RecipeCard>
              </Col>
            ))}
          </>
        </Row>
      </Container>
    );
  }
}
export default RecipeGrid;
