
import { useState,useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie'; 
import Chat from './components/Chat'; 
import {signOut} from "firebase/auth";
//need the same uth for signing out 
import {auth} from "./firebaseConfig";
//accessing the cookies for modification using variable 
const cookies =new Cookies();  


function App() { 
  //dividig the app into two parts-with auth and without auth 
  //if the auth is already done,we would be able to access the cookie using get statement 
  //cookies.get returns the cookie
const [isAuth,setIsAuth]=useState(cookies.get("auth-token"));
//isAuth==null value==cookie not fetched==cookie not created==user not logged in==should undergo authentication 
//if the user is already authenticated,make him enter a room,else send him to chat 
const [room,setRoom]=useState(null); 
//use ref to grab the whole value entered into the input field 
const roomInputRef=useRef(null); 
//all the firebase functions need to be wrapped in async and await 
const signUserOut = async ()=>{
  await signOut(auth) //signs us out
  //removing cookies externally because string cookies means still being authenticated 
  cookies.remove("auth-token"); 
  //part of cookie removing process
  setIsAuth(false); 
//exit from the room once logged out 
  setRoom(null);
}
if(!isAuth){
  return (
    <div className="App">
      <Auth setIsAuth={setIsAuth}/>
    </div>
  ); 
} 
return(
<>
{room
?(
<Chat room={room}/>
)
:
(
<div className="room">
<label>
  Enter room name:
</label> 
{/* //ref will catch the whole setence written inside the input tag */}
<input ref={roomInputRef}> 
</input> 
{/* //we only want the value entered by the user amongst all other info captured by the useref hook */}
<button onClick={()=>setRoom(roomInputRef.current.value)}>Enter chat</button>     
  </div>
  )} 
  {/* //sign-out functionality ,would exist throughout the app */} 
  <div>
    <button onClick={signUserOut}>
      SIGN OUT
    </button>
  </div>
  
</> 
)

} 


export default App;
