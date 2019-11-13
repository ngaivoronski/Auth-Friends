import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState({
        name: "",
        age: "",
        email: "",
    })

    const formChange = event => {
        setNewFriend({
            ...newFriend,
            [event.target.name]: event.target.value,
        })
    }

    const submitForm = event => {
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
    },[]);
    return (
        <div className="friends-div">
            <form className="friend-form-div" onSubmit={submitForm}>
                <label htmlFor="name">Name:</label>
                <input name="name" value={newFriend.name} onChange={formChange}/>
                <label htmlFor="age">Age:</label>
                <input name="age" value={newFriend.age} onChange={formChange}/>
                <label htmlFor="email">Email:</label>
                <input name="email" value={newFriend.email} onChange={formChange}/>
                <button type="submit">Add New Friend</button>
            </form>
            <div className="friend-list-div">
                {friends.map(person => (
                    <div key={person.id}>
                        <h2>{person.name}</h2>
                        <p>{person.age}</p>
                        <p>{person.email}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}