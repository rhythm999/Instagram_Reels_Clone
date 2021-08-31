import { useState, useContext } from "react";
import './Css/VideoCard.css'
import { AuthContext } from "./AuthProvider"
import { firestore } from "../firebase";

let VideoCard = (props) => {

    let value = useContext(AuthContext);
    let [playing, setplaying] = useState(false);
    let [comment, setcomment] = useState(false);
    let [currComment, setcurrComment] = useState("");
    let like = props.details.likes.includes(value.uid);
    let like_value = like ? "favorite" : "favorite_border";
    let totallikes = props.details.likes.length;

    return (<div className="mainBocContainer">
        {
            comment ?
                (
                    <div className="video-card">
                        <div className="commentBOX">
                            <div>
                                <button className="btn btn-primary backBtn" onClick={() => {
                                    setcomment(false);
                                }}>Back</button>
                            </div>
                            <div className="allCommentSection">
                                {props.details.comments.map((e) => {
                                    return (
                                        <div className="comments">
                                            <div className="comments_detail">
                                                <img src={e.photoURL} className="comment_photo"></img>
                                                <div className="comments_name">{e.displayName}</div>
                                            </div>
                                            <div className="comment_comment"> {e.comment}</div>
                                        </div>)
                                })}
                            </div>
                            <div className="newcommentBox">
                                <input className="newComment" placeholder="   Enter new comment..." value={currComment} onChange={(e) => {
                                    setcurrComment(e.currentTarget.value);
                                }} />
                                <span class="material-icons sendbtn" onClick={() => {
                                    firestore.collection("posts").doc(props.details.id).update({
                                        comments: [...props.details.comments, {
                                            comment: currComment,
                                            photoURL: value.photoURL,
                                            displayName: value.displayName
                                        }]
                                    })
                                    setcurrComment("");
                                }}>send</span>
                            </div>
                        </div>
                        <span className="name">@ {props.details.username}</span>
                        <span className="music">
                            <span class="material-icons music-logo">audiotrack</span>
                            <marquee className="music-name">{props.details.song}</marquee>
                        </span>
                        <p className="description"> {props.details.Description}</p>
                    </div>

                )
                :
                <div className="video-card">
                    <video src={props.details.url} onClick={(e) => {
                        if (!playing) {
                            setplaying(true);
                            e.currentTarget.play();
                        }
                        else {
                            setplaying(false);
                            e.currentTarget.pause();
                        }
                    }} ></video>

                    <div className="number_likes">{totallikes}</div>


                    <span class="material-icons  like" onClick={(e) => {
                        if (like) {
                            let alllikes = props.details.likes;
                            alllikes = alllikes.filter((e) => {
                                return e != value.uid;
                            })
                            firestore.collection("posts").doc(props.details.id).update({
                                likes: alllikes
                            })
                            console.log(props.details.likes.includes(value.uid))
                            like = false;
                            e.currentTarget.classList.remove("animate");

                        }
                        else {
                            firestore.collection("posts").doc(props.details.id).update({
                                likes: [...props.details.likes, value.uid]
                            })
                            like = true;
                            e.currentTarget.classList.add("animate");

                        }
                    }} >{like_value}</span>

                    <span class="material-icons comment" onClick={() => {
                        setcomment(true);

                    }}>chat</span>
                    <span class="material-icons share">share</span>
                    <span className="name">@ {props.details.username}</span>
                    <span className="music">
                        <span class="material-icons music-logo">audiotrack</span>
                        <marquee className="music-name">{props.details.song}</marquee>
                    </span>
                    <p className="description"> {props.details.Description}</p>
                </div>

        }


    </div >
    )
}

export default VideoCard;