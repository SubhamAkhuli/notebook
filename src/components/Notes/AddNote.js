import React, { useContext, useState } from 'react'

// import the context to use the context
import NoteContext from '../../context/notes/noteContext'

function AddNote(props) {
    // in the functional component, we can use the context using the useContext hook
    const context = useContext(NoteContext);

    // Destructuring the context
    const { addNote } = context;

    // set from input form
    const [note, setNote] = useState({  title:"", contant: "", tag: "" })

    // Add Note
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.contant, note.tag);
        setNote({ title: "", contant: "", tag: "" })
        props.showAlert("Note Added Successfully", "success")
    }

    // form onchange funcation
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        // console.log(note)
    }

    return (
        <div>
            {/* ADD THE USER NOTES */}
            <div className="container my-3">
                <h2>{props.title}</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title"
                            name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contant" className="form-label">Description</label>
                        <input type="text" className="form-control" id="contant" name="contant" value={note.contant} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={3} required/>
                    </div>
                    <button disabled={note.title.length<5 || note.contant.length<5 || note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleSubmit}>{props.submit}</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
