import Container from "./components/Container";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonContainer from "./components/ButtonContainer";
import "./styles.css";
import CalcProvider from "./context/CalcContext";

const btnValues = [
  ["AC", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

function App() {
  return (
    <div className="App">
      <CalcProvider>
        <Container>
          <Screen />
          <ButtonContainer>
            {btnValues.flat().map((btn, index) => (
              <Button value={btn} key={index} />
            ))}
          </ButtonContainer>
        </Container>
      </CalcProvider>
    </div>
  );
}
export default App;
