import { useState } from "react";

export default function Home({age}){
  // if(age>18) return <h2>Welcome</h2>;
  // else return <h2>Not Allowed</h2>

    // return age>18 ? <h2>Welcome</h2> : <h2>Not Allowed</h2>
    // return age>18 && <h2>Welcome</h2>;

  // return (
  //   <>
  //     <div>Hello {name}, you are {age} years old</div>
  //     <p>This is a paragraph</p>
  //   </>
  // )

  // const handleClick = ()=>{
  //   alert("Hello")
  // }
  // const handleSubmit = (name)=>{
  //   alert(`Hello ${name}`)
  // }
  // return(
  //   <>
  //     <h2>Hello World</h2>
  //     <button onClick={handleClick}>Click</button>
  //     <button onClick={()=> handleSubmit("John")}>Submit</button>
  //   </>
  // )

  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [msg, setMsg] = useState("")
  const run = ()=>{
    if(wicket==10){
      return
    }
    setScore(score+1)
    setMsg("Well Done")
  }
  const wick = ()=>{
    if(wicket==10){
      setMsg("Game Over")
      return
    }
    setWicket(wicket+1)
    setMsg("Better Luck Next Time")
  }
  return(
    <>
    <p>Score: {score}</p>
    <p>Wicket: {wicket}</p>
    <p><span>{msg}</span></p>
    <button onClick={run}>Run</button>
    <button onClick={wick}>Wicket</button>
    </>
  )

}