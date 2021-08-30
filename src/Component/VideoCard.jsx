import { useState } from "react";

import './Css/VideoCard.css'

let VideoCard = (props) => {

    let [playing, setplaying] = useState(false);
    let [like, setlike] = useState(false);
    let [comment, setcomment] = useState(false);

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
                                
                            </div>
                            <div className="newcommentBox">
                                <input className="newComment" placeholder="   Enter new comment..." />
                                <span class="material-icons sendbtn">send</span>
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
                    <span class="material-icons  like" onClick={(e) => {
                        if (like) {
                            setlike(false);
                            e.currentTarget.classList.remove("animate");
                            e.currentTarget.innerText = "favorite_border";
                        }
                        else {
                            setlike(true);
                            e.currentTarget.classList.add("animate");
                            e.currentTarget.innerText = "favorite";
                        }
                    }} >favorite_border</span>
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