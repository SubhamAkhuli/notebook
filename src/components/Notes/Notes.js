import React, { useState, useContext, useEffect, useRef } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

// import the context to use the context
import NoteContext from '../../context/notes/noteContext'


export default function Notes(props) {

    // in the functional component, we can use the context using the useContext hook
    const context = useContext(NoteContext);

    // useNavigate hook
    const navigate = useNavigate()

    // Destructuring the context
    const { notes, getNotes, editNote } = context;

    // Fetching all notes
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login")
            props.showAlert("You are not Logged in", "danger")
        }
        // eslint-disable-next-line
    }, [])

    // update modal on set 
    const ref = useRef(null)

    // set from update form
    const [note, setNote] = useState({ id: "", etitle: "", econtant: "", etag: "" })

    // update Note
    const updateNote = (currentNote) => {
        // on the update modal
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, econtant: currentNote.content, etag: currentNote.tag })
    }

    // update modal close set 
    const refColse = useRef(null)

    // update Note and close the modal
    const handleSubmit = (e) => {
        // API Call to update the note
        editNote(note.id, note.etitle, note.econtant, note.etag)
        refColse.current.click();
        props.showAlert("Update the note", "success")
    }

    // form onchange funcation
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            {/* ADD THE USER NOTES */}
            <AddNote showAlert={props.showAlert}title="Add a Note" submit="Add Note" />

            {/* update modal */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle"
                                        name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contant" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="econtant" name="econtant" value={note.econtant} onChange={onchange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} minLength={3} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refColse} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.econtant.length<5 || note.etag.length
                            <3}  type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* SHOW THE USER NOTES */}
            <div className='container my-3'>
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container">
                    {notes.length === 0 && 'No notes to display. Add a note to get started'}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} key={note._id} />
                    })}
                </div>
            </div>
        </>
    )
}