import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Friends() {
    const [friends, setFriends] = useState([]);

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
        <div>
            {friends.map(person => (
                <div key={person.id}>
                    <h2>{person.name}</h2>
                    <p>{person.age}</p>
                    <p>{person.email}</p>
                </div>
            ))}
        </div>
    )
}