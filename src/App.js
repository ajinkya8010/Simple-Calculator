
import { useState } from "react";


function App() {

  const [calc,setCalc] = useState("");

  const ops = ['/','*','+','-'];

  
  const [flag,setFlag] = useState(false);

  const updateCalc = value =>{
    if(ops.includes(value)) setFlag(false);
    if(
      ops.includes(value) && calc===''||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ){
      
      return;
    }
    if(value=='.'){
      if(flag || ops.includes(calc.slice(-1))){
        return;
      }
      setFlag(true);
    }
    setCalc(calc+value);
  }

  const createDigits = () => {
    const digits =[];

    for(let i =1;i<10;i++){
      digits.push(
        <button onClick={()=>updateCalc(i.toString())} 
        key={i}>{i}
        </button>
      )
    }
    return digits;
  }


  const calculate = () => {
   if(ops.includes(calc.charAt(calc.length-1))){
    setCalc(calc.slice(0,-1));
    return;
   } 
   setCalc(eval(calc).toString());
  }

  const deleteLast = () => {
    if(calc == '') return;
    if(calc.slice(-1)=='.') setFlag(false)
    if(ops.includes(calc.slice(-1))) setFlag(true)
    const value = calc.slice(0,-1);
    setCalc(value);
   }


  return (
    <div className="App">
      <div className="calculator">

        <div className="display">
          {calc || "0"}
        </div>

        <div className="operators">
          <button onClick={()=>updateCalc('/')}>/</button>
          <button onClick={()=>updateCalc('*')}>*</button>
          <button onClick={()=>updateCalc('+')}>+</button>
          <button onClick={()=>updateCalc('-')}>-</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={()=>updateCalc('0')}>0</button>
          <button onClick={()=>updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
