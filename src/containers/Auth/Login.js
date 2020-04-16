import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {
    useLocation,
    useHistory,
    Redirect,
  } from "react-router-dom";

  function Login(props) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
//   const apiUrl = "http://localhost:3001/signin";
//   const apiUrl = "http://localhost:3001";
  //send username and password to the server
  // for initial authentication

  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const auth = async () => {
    console.log('calling auth')
    console.log(email)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email: email, password } }
      //call api
      const res = await axios.post(`${props.apiUrl}/signin`, loginData);
    //   console.log(res.data.auth);
      console.log(res.data.screen);
      console.log("logging retur from server when login:");
      console.log(res.data);
      props.setToken(res.data.token);
      //process the response
      if (res.data.screen !== undefined) {
        // setEmployee(res.data.employee);
        // console.log(res.data.employee);
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
//   const readCookie = async () => {
//     try {
//       console.log('--- in readCookie function ---');

//       //
//       const res = await axios.get(`${apiUrl}/read_cookie`);
//       // 

//       console.log("reading the res readCookie function: ");
//       console.log(res.data);

//       if (res.data.employee !== undefined) {
//         setEmployee(res.data.employee);
//         console.log(res.data.employee)
//       }

//       if (res.data.screen !== undefined) {
//         setScreen(res.data.screen);
//         console.log(res.data.screen)
//       }
//     } catch (e) {
//       console.log("Error in line 66");
//       setEmployee({});
//       setScreen('auth');
//       console.log(e);
//     }
//   };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    // readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App">
      {screen === 'auth' 
        ?         
          <div> 
            <div className="form-group">
              <label>Email address</label>
              <input type="email" onChange={e => setEmail(e.target.value)}  className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" onChange={e => setPassword(e.target.value)}  className="form-control" />
            </div>
            <button onClick={auth} className="btn btn-primary">Submit</button>
          </div>
        : <Redirect to={{ pathname: from.pathname }} />
      }
    </div>
  );
}

export default Login;

