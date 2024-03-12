import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// import the context to use the context
import NoteContext from '../../context/notes/noteContext'
import UserContext from '../../context/user/userContext';


function Profile(props) {

  // in the functional component, we can use the context using the useContext hook
  const Usercontext = useContext(UserContext)
  const Notecontext = useContext(NoteContext);
  
  // useNavigate hook
  const navigate = useNavigate()

  // Destructuring the context
  const { user, getUser,editUser } = Usercontext;
  const { notes, getNotes } = Notecontext;

  // Fetching  userdata
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      getUser();
    }
    else {
      navigate("/login")
      props.showAlert("You are not Logged in", "danger")
    }
    // eslint-disable-next-line
  }, [])

  // set the user data
const [details, setDetails] = useState({ name: "", email: "" })

 // set the user data
  useEffect(() => {
    setDetails({ name: user.name, email: user.email })
  }, [user])
 

    // update user
    const handleSubmit = (e) => {
      // API Call to update the user
      editUser(details.name, details.email) 
      if (details.name === "" || details.email === "") {
        props.showAlert("Please fill the details", "danger")
      }
      else
      {
        navigate("/home")
        props.showAlert("User Details Updated", "success")
      }
  }
  
  // form onchange funcation
  const onchange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }  


  return (
    <div className='container'>
      <h2>Profile</h2>
      <form className='mt-3' onSubmit={handleSubmit}>
        <div className="form- mt-3">
          <label htmlFor="exampleInputEmail1">Your Name</label>
          <input type="text" id="name" name='name' className="form-control mt-2" aria-describedby="emailHelp" value={details.name} onChange={onchange} minLength={3} required />
        </div>
        <div className="form- mt-3">
          <label htmlFor="email">Your Email address</label>
          <input type="email" className="form-control mt-2"  id="email" name='email' aria-describedby="emailHelp" value={details.email} onChange={onchange} minLength={6} required/>
        </div>
        <div className="form- mt-3">
          <label htmlFor="exampleInputEmail1">Number of Notes</label>
          <input disabled="true" type="email" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={notes.length}  />
        </div>
        
      <div className="modal-footer mt-3">
        <button disabled={details.name === user.name && details.email === user.email} type="submit" className="btn btn-primary" >Update Details</button></div>
      </form>
        </div>
    
  )
}

export default Profile
