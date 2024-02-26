import React, { useContext } from 'react'

// import the context to use the context
import NoteContext from '../../context/notes/noteContext'


function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <div className="d-flex align-items-center">
                        <i className="far fa-sticky-note"></i>
                        <h6 className="card-title mx-2">{note.title}</h6>
                        <i className="far fa-trash-alt mx-2" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Note Deleted Successfully", "success");
                        }}></i>
                        <i className="far fa-edit mx-2" onClick={() => {
                            updateNote(note);
                        }}></i>
                    </div>
                    <p className="card-text">{note.content}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
