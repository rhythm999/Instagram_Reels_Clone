import { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth, firestore } from "./firebase";
import VideoCard from "./VideoCard"

import { AuthContext } from "./AuthProvider"

let Home = () => {

    let [Posts, setPosts] = useState([]);
    let value = useContext(AuthContext);

    useEffect(() => {
        let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
            setPosts(
                querySnapshot.docs.map((doc) => {
                    console.log(doc.data());
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
                                <div className="personal_cont"> {value.displayName}</div>
                            </div>
                            <div className="profile_btn"></div>
                            <span class="material-icons logout_btn" onClick={() => {
                                auth.signOut();
                            }}>power_settings_new</span>
                            <Link to="/upload">
                                <span class="material-icons upload_btn">upload</span>
                            </Link>
                        </>
                    )
                    :
                    (<Redirect to="/"></Redirect>)
            }
        </div>
    )
}

export default Home;