import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// import the context to use the context
import NoteContext from '../../context/notes/noteContext'


function Profile(props) {

  // in the functional component, we can use the context using the useContext hook
  const context = useContext(NoteContext);

  // useNavigate hook
  const navigate = useNavigate()

  // Destructuring the context
  const { user, getUser, notes, getNotes, } = context;

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

  return (
    <div className='container'>
      <h2>Profile</h2>
      <form className='mt-3'>
        <div className="form- mt-3">
          <label for="exampleInputEmail1">Your Name</label>
          <input type="text" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.name} />
        </div>
        <div className="form- mt-3">
          <label for="exampleInputEmail1">Your Email address</label>
          <input type="email" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={user.email} />
        </div>
        <div className="form- mt-3">
          <label for="exampleInputEmail1">Number of Notes</label>
          <input type="email" className="form-control mt-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={notes.length} />
        </div>
      </form>
    </div>
  )
}

export default Profile
