import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/home");
            props.showAlert("Logged in Successfully", "success");
        }
        else{
            props.showAlert("Invalid detials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="mt-3">Don't have an account?
          <button className="btn btn-primary mx-2"><NavLink style={{
            textDecoration: "none"
            , color: "white"
          }} to="/signup">Signup</NavLink></button></p>
            </form>
        </div>
    )
}

export default Login