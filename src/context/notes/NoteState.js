import React, { useState } from 'react'
import NoteContext from './noteContext'

// the noteState is a function that takes a value argument and returns in the component.
const NoteState = (props) => {
    const host = "http://localhost:8000"

    // Fetching all notes
    const initialNotes = []
    // useState is a hook that allows you to have state variables in functional components.
    const [notes, setNotes] = useState(initialNotes);



    // Get All Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }




    // Add Note
    const addNote = async (title, content, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, content, tag })
        });
        await response.json()
        const note = {
            "_id": "65d60fc0ac69a1cda3",
            "user": "65d4be8a0b50bf39629d00d2",
            "title": title,
            "content": content,
            "tag": tag,
            "createdAt": "2024-02-21T14:59:12.829Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
        console.log("Adding a new note", notes)
    }



    // Delete Note
    const deleteNote = (id) => {
        // API Call
        fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')
            }
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }




    // Edit Note
    const editNote = async (id, title, content, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, content, tag })
        });
        await response.json()
        // Edit in UI
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title
                element.content = content
                element.tag = tag
                break
            }
        }
        setNotes(newNotes)
    }

    // NoteContext.Provider is a component that provides the context to its children. It takes a value prop which is the value of the context.
    return (
        <NoteContext.Provider value={{ notes, setNotes,  addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState