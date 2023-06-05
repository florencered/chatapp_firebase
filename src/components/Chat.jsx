import React, { useEffect } from 'react'
import "../styles/chat.css"
import { useState } from 'react';
//import addDoc to start with row table/documents i.e tools needed in firestore
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from "../firebaseConfig";


const Chat = ({ room }) => {
  //create a new state for storing new messges 
  const [newMessage, setNewMessage] = useState("");
  //reflect changes in the messages array in realtime/UI as well 
  const [messages, setMessages] = useState([]);
  //making refernce to the database and the collection/table(there can be multiple tables or collections)
  const messagesRef = collection(db, "messages");
  //using onSnapdhot function so which listens for changes in document once initialied in the begenning
  //and updates the firstore database accordingly 
  useEffect(() => {
    //we need to mention which changes we need to listen using the onsnapshot function using queries
    const queryMessages = query(messagesRef, where("room", "==", room)
    //we need to make some changes in firestore to get a workaround
    ,orderBy("createdAt"));
    const unsubscribe= onSnapshot(queryMessages, (snapshot) => {
      console.log("NEW MESSAGE");
      console.log(snapshot);
      //we need to create objects inside the parent array to save the messages sent
      //and stored by snapshot along with their id
      //it has a set syntax 
      ////INITIALISE EMPTY ARRAY 
      let messages = [];
      //PARSING THROUGH THE SNAPSHOT OBJECT 
      snapshot.forEach((doc) => {
        //STORING DATA AND RES. ID AS AN OBECT INSIDE MESSAGES ARRAY WHICH CONTAINS PREV DATA AS WELL
        messages.push({ ...doc.data(), id: doc.id })
      });
      //update the state of messages 
      setMessages(messages); 
      console.log(messages);
    }); 
    return ()=>unsubscribe();
  }, [])
  //when we us the onSna
  const handleSubmit = async (e) => {
    // so that the form does not get sumitted as soon as we click the submit button 
    e.preventDefault();
    console.log(newMessage);
    //if the newMessage is empty,we should end the function since there is nothing to store 
    if (newMessage === "") {
      return
    }
    //telling the computer which doc collection we are using and storing the info we would like to store
    await addDoc(messagesRef, {
      //the messages stored
      text: newMessage,
      //when the message was created and sent using serverTimestamp() function
      createdAt: serverTimestamp(),
      //fetching the display name of the current authenticated user 
      user: auth.currentUser.displayName,
      //get the room name from app.js which was entered by the user 
      room: room,
    });
    //get rid of the input message info and update state to empty once it's inf has been stored 
    setNewMessage("");

  };
  return (
    <div>
      <div className="chat-app"> 
      <div className="header">
        <h1>Welcome to:{room.toUpperCase()}</h1>
      </div>
        <div className='messages'>{messages.map((message)=>(
          <div className="message" key={message.id}>
              <span className="user">
                {message.user}
              </span> 
              {message.text}
          </div>
        )
       
        )
        }
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
          <input type="text" className="new-message-input" placeholder='type your message here'
            onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
          <button className='send-button' type='submit'>SEND</button>
        </form>
      </div>
    </div>
  )
}

export default Chat