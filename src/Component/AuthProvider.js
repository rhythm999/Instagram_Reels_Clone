import { createContext, useEffect, useState } from "react"
import { auth, firestore } from "../firebase"

export const AuthContext=createContext();

let AuthProvider=({children})=>{

    let [currentUser,setcurrentUser]=useState(null);
    let [loading,setloading]=useState(true);
    console.log(currentUser);

    //for authentication details when user logges in using google login
    useEffect(()=>{
        let unsub=auth.onAuthStateChanged(async(user)=>{
            if(user){
                let {displayName,email,uid,photoURL}=user;
                // this will get the reffrence of collection present on
                // firebase whose name is users but if there is no collection
                // present whose name is users then it will give some reffrence of temp collection 
                let docref=firestore.collection("users").doc(uid);
                // this will get the collection we want if not empty collection is shown
                let document=await docref.get();
                if(!document.exists){
                    docref.set({
                        displayName,
                        email,
                        photoURL,
                        id:uid,
                    })
                }
                setcurrentUser({displayName,email,uid,photoURL});
               
            }
            else{
                setcurrentUser(user);
            }
            setloading(false);
        })
        return()=>{
            unsub();
        }
    },[]);
    return(
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;