import { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { AuthContext } from "./AuthProvider"
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard"

import "../Component/Css/Profile.css"


let Profile = () => {

    let [posts, setPosts] = useState([]);
    let value = useContext(AuthContext);
    let photoURl = value.photoURl;
    let [avatar,setavatar]=useState(0);

    useEffect(() => {
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
            setPosts(
                querySnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id, };
                })
            )
        })
        return () => {
            unsub();
        }
    }, []);



    return (
        <>
            <div className="myVideoContainer">
                {posts.map((post) => {
                    return value.uid == post.uid ? <VideoCard details={post} /> : ""
                })}
            </div>
            <div className="detailContainer">
                <div className="profile_tag"> Personal Profile</div>
                <button className="AvatarChange" onClick={()=>{
                    setavatar((avatar+1)%5);
                }}> Change Avatar</button>
                {avatar==1?<img src={value.photoURL} className="Avatar"></img>:
                    avatar==2?<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvR2EmeDnAttbXXbBr_HtCX1qjGmUoSlP1_Q&usqp=CAU" className="Avatar"></img>:
                    avatar==3?<img src="https://cdn.pixabay.com/photo/2021/08/23/07/16/woman-6566920_960_720.png" className="Avatar"></img>:
                    avatar==4?<img src="https://cdn.pixabay.com/photo/2021/07/25/07/49/man-6491147_960_720.png" className="Avatar"></img>:
                    <img src="https://cdn.pixabay.com/photo/2021/01/31/08/58/woman-5966300_960_720.png" className="Avatar"></img>
                    
                }
                <Link to="/home">
                    <div className="logo">SPOOL</div>
                </Link>
            </div>
            <div className="profile_btn"></div>
            <span class="material-icons logout_btn" onClick={() => {
                auth.signOut();
            }}>power_settings_new</span>
            <Link to="/upload">
                <span class="material-icons upload_btn">upload</span>
            </Link>
            <img src="https://cdn.pixabay.com/photo/2017/07/01/13/55/divider-2461548__340.png" className="poster"></img>
        </>


    )
}

export default Profile;