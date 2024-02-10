import React from 'react'
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const Singup = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email:"", password:""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call
    const {name, email, password} = credentials;
    const response = await fetch(`${window.location.origin}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        history('/');
        props.showAlert("Account Created Successfully", "success")
    }
    else{
      props.showAlert("Invailed Details", "danger")
    }
  };
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  };
  return (
    <div className='my-5'>
      <h2>Create an account to use INoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={onChange}
            // value={credentials.email}
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={onChange}
            // value={credentials.email}
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
            // value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            name="password"
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Conform Password
          </label>
          <input
            type="password"
            // value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5} required
          />
        </div>
        <button disabled={credentials.password.length<5} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Singup
