import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState({
        name: "",
        age: "",
        email: "",
    })
    const [editing, setEditing] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const formChange = event => {
        setNewFriend({
            ...newFriend,
            [event.target.name]: event.target.value,
        })
    }

    const submitForm = event => {
        if (editing === "") {
            event.preventDefault();
            axios
            .post("http://localhost:5000/api/friends", newFriend, { headers:{authorization: sessionStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                setFriends(response.data);
                setNewFriend({
                    name: "",
                    age: "",
                    email: "",
                })
            })
            .catch(err => {
                console.log("there was an error", err)
            });
        } else {
            event.preventDefault();
            axios
            .put(`http://localhost:5000/api/friends/${editing}`, newFriend, { headers:{authorization: sessionStorage.getItem("token")}})
            .then(response => {
                console.log(response);
                setFriends(response.data);
                setNewFriend({
                    name: "",
                    age: "",
                    email: "",
                })
                setEditing("");
            })
            .catch(err => {
                console.log("there was an error", err)
            });
        }
    }

    const deleteFriend = id => {
        axios
        .delete(`http://localhost:5000/api/friends/${id}`, { headers:{authorization: sessionStorage.getItem("token")}})
        .then(response => {
            console.log(response);
            setFriends(response.data);
        })
        .catch(err => {
            console.log("there was an error", err)
        });
    }

    const editFriend = person => {
        setEditing(person.id);
        setNewFriend({
            name: person.name,
            age: person.age,
            email: person.email,
        });
    }

    const LogOut = () => {
        sessionStorage.removeItem("token");
        console.log("Logout fires!");
        console.log(sessionStorage);
        setLoggedIn(false);
    }

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/friends",{ headers:{authorization: sessionStorage.getItem("token")}})
        .then(response => {
            console.log(response);
            setFriends(response.data);
        })
        .catch(err => {
            console.log("there was an error", err)
        });
    },[loggedIn]);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
        setLoggedIn(true);
        } else {
        setLoggedIn(false);
        }
    },[])

    if (!sessionStorage.getItem("token")) {
        console.log("rerender");
        return( <Redirect to="/login"/> );
    } else {
        return (
            <div className="friends-div">
                <form className="friend-form-div" onSubmit={submitForm}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" value={newFriend.name} onChange={formChange}/>
                    <label htmlFor="age">Age:</label>
                    <input name="age" value={newFriend.age} onChange={formChange}/>
                    <label htmlFor="email">Email:</label>
                    <input name="email" value={newFriend.email} onChange={formChange}/>
                    <button type="submit">{editing === "" ? "Add New Friend" : "Edit Friend"}</button>
                </form>
                <div className="friend-list-div">
                    {friends.map(person => (
                        <div key={person.id}>
                            <h2>{person.name}</h2>
                            <p>{person.age}</p>
                            <p>{person.email}</p>
                            <button onClick={() => editFriend(person)}>Edit</button>
                            <button onClick={() => deleteFriend(person.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                <button onClick={LogOut}>Log Out</button>
            </div>
            
        )
    }
}