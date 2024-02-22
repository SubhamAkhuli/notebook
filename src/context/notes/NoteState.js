import React from 'react'
import NoteContext from './noteContext'

// the noteState is a function that takes a value argument and returns in the component.
const NoteState = (props) => {
    const state = {
        "name": "Harry",
        "class": "5th",
        "rollno": 12
    }

    // NoteContext.Provider is a component that provides the context to its children. It takes a value prop which is the value of the context.
    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState