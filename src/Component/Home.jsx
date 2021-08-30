import { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, firestore } from "../firebase";
import VideoCard from "./VideoCard"

import { AuthContext } from "./AuthProvider"

let Home = () => {

    let [Posts, setPosts] = useState([]);
    let value = useContext(AuthContext);
    

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
    }, []);



    return (
        <div>
            {
                value
                    ?
                    (
                        <>
                            <div className="myVideoContainer">
                                {Posts.map((post,index) => {
                                   return  <VideoCard details={post} index={index}/>
                                })}
                            </div>
                            <div className="detailContainer">
                                <div className="greenDot"></div>
                                <Link to="/profile">
                                <div className="personal_cont"> {value.displayName}</div>
                                </Link>
                                <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvR2EmeDnAttbXXbBr_HtCX1qjGmUoSlP1_Q&usqp=CAU" className="Avatar"></img>
                                <div className="logo">SPOOL</div>
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
                    :
                    (<Redirect to="/"></Redirect>)
            }
        </div>
    )
}

export default Home;