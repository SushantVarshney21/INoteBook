import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call
    const response = await fetch(`${window.location.origin}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password}),
    });
    const json = await response.json();
    console.log(json);
    console.log(json.authToken);
    if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
         props.showAlert("LoggedIn Successfully", "success")
         history('/');
       
    }
    else{
        props.showAlert("Invailed Credentials", "danger")
    }
  };
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  };
  return (
    <div className="my-5">
      <h2>Login to continue to INoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={onChange}
            value={credentials.email}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
