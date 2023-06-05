import React from 'react'
//import the authentication and google autn provider which was exported after imported in the fireebase-config file 
import{auth,provider} from "../firebaseConfig.js"; 
//how the sign in option will be displayed to the user,so we use sign in with popup or redirection 
import { signInWithPopup } from 'firebase/auth'; 
//cookies to make sure that the data of the user gets stored and he remains logged in wvwn after rfreshng 
import Cookies from 'universal-cookie'; 
import "../styles/auth.css"
//accessing the cookies for modification using variable 
const cookies =new Cookies(); 


const Auth = ({setIsAuth}) => {  
    //function which gets trigggered when the button is clicked which is basically a promise
    const signInWithGoogle= async ()=>{ 
        //every thing inside the function should wait until signinwithpopup is not done 
        //google captures some information after we sign in 
            try{
            const result=await signInWithPopup(auth,provider); 
            console.log(result.user.refreshToken);
            //set a cookie named auth-token with it's value equal to auth-token 
            cookies.set("auth-token",result.user.refreshToken); 
            console.log("the result for cookie.get is:",cookies.get("auth-token")); 
            setIsAuth(true);
            } 
            //error handling ,always wise to use try catch for error handling when using async await
            catch(err){ 
                console.error(err); 
                alert("Sorry we ran into an error");

            }

            
    }

  return (
    <div className="auth">
        <p>Sign with google to continue</p>  
        <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  )
}

export default Auth