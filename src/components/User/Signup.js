import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


function Signup(props) {
  // in the functional component, we can use the context 
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const { name, email, password, cpassword } = credentials;
    if (password !== cpassword) {
      props.showAlert("Password do not match", "danger");
      return;
    }
    else {
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/login");
      props.showAlert("Account created Successfully", "success");
    }
    else {
      props.showAlert("Invalid credentials", "danger");
    }
  }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
          <div id="emailHelp" className="form-text">Please Enter valid name atleast 3 characters.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" onChange={onChange} className="form-control" id="password" name='password' minLength={4} required />
          <div id="emailHelp" className="form-text">Password atleast 4 characters.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={4} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <p className="mt-3">Don't have an account?
          <button className="btn btn-primary mx-2"><NavLink style={{
            textDecoration: "none"
            , color: "white"
          }} to="/login">Login</NavLink></button></p>
      </form>
    </div>
  )
}

export default Signup

