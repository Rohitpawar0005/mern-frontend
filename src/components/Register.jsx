import "./Register.css";
// import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const handleSubmit = async () => {
    try {
      const url = "http://127.0.0.1:8080/api/users/register";
      const result = await axios.post(url, user);
      setError("Data saved successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="App-Register-Row">
      <div style={{ backgroundColor: "white" }} className="form">
        <h2>Registration Form</h2>
        {error}
        <p>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="Enter First Name"
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Enter Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </p>
        <p>
          <button onClick={handleSubmit}>Submit</button>
        </p>
      </div>
    </div>
  );
}

// export default function Register() {
//   const firstName = useRef();
//   const lastName = useRef();
//   const email = useRef();
//   const password = useRef();
//   const handleSubmit = () => {
//     const user = {
//       firstName: firstName.current.value,
//       lastName: lastName.current.value,
//       email: email.current.value,
//       password: password.current.value,
//     };
//     console.log(user);
//   };
//   return (
//     <div className="App-Register-Row">
//       <div style={{ backgroundColor: "white" }}>
//         <h2>Registration Form</h2>
//         <p>
//           <input type="text" placeholder="Enter First Name" ref={firstName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Last Name" ref={lastName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Email Address" ref={email} />
//         </p>
//         <p>
//           <input type="password" placeholder="Enter Password" ref={password} />
//         </p>
//         <p>
//           <button onClick={handleSubmit}>Submit</button>
//         </p>
//       </div>
//     </div>
//   );
// }