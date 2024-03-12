import React, { useState } from 'react';
import UserContext from './userContext';

const UserState = (props) => {
    const host = "http://localhost:8000"

    // Fetching user data
    const userdata = []
    const [user, setUser] = useState(userdata)

    //Get User Details
    const getUser = async () => {
        // API Call 
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setUser(json)
    }


    
    // edit a user
    const editUser = async (name, email) => {
        // API Call
        const response = await fetch(`${host}/api/auth/edituser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email })
        });
        const json = await response.json()
        setUser(json)
    }


    return (
        <UserContext.Provider value={{ user, getUser, editUser }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserState;