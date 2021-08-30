import { useContext, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { AuthContext } from "./AuthProvider"
import Preview from "./Preview"
import { Link } from "react-router-dom";

import "../Component/Css/Profile.css"


let Profile = () => {

    let [posts, setPosts] = useState([]);
    let value = useContext(AuthContext);
    let photoURl = value.photoURl;

    useEffect(() => {
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
            setPosts(
                querySnapshot.docs.map((doc) => {
                    return doc.data();
                })
            )
        })
        return () => {
            unsub();
        }
    }, [])


    return (
        <div className="Profile_container">
            <Link to="/home">
            <div className="logo">SPOOL</div>
            </Link>
            <div className="Profile">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvR2EmeDnAttbXXbBr_HtCX1qjGmUoSlP1_Q&usqp=CAU" className="profile_photo"></img>
                <div className="profile_Name">{value.displayName}</div>
            </div>
            <div className="reel_container">

            {
                posts.map((post) => {
                    return value.uid == post.uid ? <Preview details={post} /> : ""
                })
            }
            </div>


        </div>
    )
}

export default Profile;