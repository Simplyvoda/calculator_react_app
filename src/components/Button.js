import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

// returns class name for styles.css cheat
const getClassName = (btn) => {
  const ClassName = {
    "=": "equals",
    "/": "opt",
    "+": "opt",
    "-": "opt",
    X: "opt",
    AC: "opt-AC",
    "%": "opt"
  };
  return ClassName[btn];
};

// main button component
const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  // function for dotClick
  const dotClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
    });
  };

  // function for clearClick (AC)
  const clearClick = () => {
    setCalc({ sign: "", num: 0, rem: 0 });
  };

  //function for when user clicks numbers
  const numBtnClick = () => {
    const numString = value.toString();

    let numValue;
    if (numString === "0" && calc.num === 0) {
      numValue = "0";
    } else {
      numValue = Number(calc.num + numString);
    }

    setCalc({
      ...calc,
      num: numValue
    });
  };

  // function for optClick
  const optClick = () => {
    setCalc({
      sign: value,
      rem: !calc.rem && calc.num ? calc.num : calc.rem,
      num: 0
    });
  };

  // User clicks equals button
  const evalClick = () => {
    if (calc.rem && calc.num) {
      const evalMath = (x, y, sign) => {
        const evalResult = {
          "+": (x, y) => x + y,
          "-": (x, y) => x - y,
          X: (x, y) => x * y,
          "/": (x, y) => x / y
        };
        return evalResult[sign](x, y);
      };
      setCalc({
        rem: evalMath(calc.rem, calc.num, calc.sign),
        sign: "",
        num: 0
      });
    }
  };

  // User click percent
  const percentClick = () => {
    setCalc({
      num: calc.num / 100,
      rem: calc.rem / 100,
      sign: ""
    });
  };

  //function to handle button click of special operations
  function specialBtnClick() {
    const results = {
      ".": dotClick,
      AC: clearClick,
      "/": optClick,
      X: optClick,
      "-": optClick,
      "+": optClick,
      "=": evalClick,
      "%": percentClick
    };
    if (results[value]) {
      return results[value]();
    } else {
      return numBtnClick();
    }
  }
  // rendering section of button component
  return (
    <button
      onClick={specialBtnClick}
      className={`${getClassName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
