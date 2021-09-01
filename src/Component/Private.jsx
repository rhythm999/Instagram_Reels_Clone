import { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { Link  , Redirect} from "react-router-dom";
import VideoCard from "./VideoCard"
import { AuthContext } from "./AuthProvider"
import "../Component/Css/Profile.css"

import { useParams } from "react-router-dom"

let Private = () => {

    let [posts, setPosts] = useState([]);
    let [avatar, setavatar] = useState(0);
    let { pid } = useParams();
    let { name } = useParams();
    console.log(pid);
    let value = useContext(AuthContext);

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
        <div>
            {
                value?
                <>
                    <div className="myVideoContainer">
                        {posts.map((post) => {
                            return pid === post.uid ? <VideoCard details={post} /> : ""
                        })}
                    </div>
                    <div className="detailContainer">
                        <div className="profile_tag"> {name}</div>
                        <button className="AvatarChange" onClick={() => {
                            setavatar((avatar + 1) % 5);
                        }}> Change Avatar</button>
                        {avatar === 1 ? <img alt="Loading Failed" src="https://cdn.pixabay.com/photo/2021/01/31/08/58/woman-5966300_960_720.png" className="Avatar"></img> :
                            avatar === 2 ? <img alt="Loading Failed" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvR2EmeDnAttbXXbBr_HtCX1qjGmUoSlP1_Q&usqp=CAU" className="Avatar"></img> :
                                avatar === 3 ? <img alt="Loading Failed" src="https://cdn.pixabay.com/photo/2021/08/23/07/16/woman-6566920_960_720.png" className="Avatar"></img> :
                                    avatar === 4 ? <img alt="Loading Failed" src="https://cdn.pixabay.com/photo/2021/07/25/07/49/man-6491147_960_720.png" className="Avatar"></img> :
                                        <img alt="Loading Failed" src={value.photoURL} className="Avatar"></img>

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
                    <img alt="Loading Failed" src="https://cdn.pixabay.com/photo/2017/07/01/13/55/divider-2461548__340.png" className="poster"></img>
                </>
                :
                <Redirect to="/login"></Redirect>
            }
        </div>

    )
}

export default Private;