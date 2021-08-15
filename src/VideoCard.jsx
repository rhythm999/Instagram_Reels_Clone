import { useState } from "react";

import './VideoCard.css'

let VideoCard = (props) => {

    let [playing, setplaying] = useState(false);
    let [like, setlike] = useState(false);

    return (
        <div className="video-card">
            <video  src={props.details.url}   onClick={(e) => {
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
            <span class="material-icons comment">chat</span>
            <span class="material-icons share">share</span>
            <p className="name">@ ${props.details.username}</p>
            <span className="music">
                <span class="material-icons music-logo">audiotrack</span>
                <marquee className="music-name">${props.details.song}</marquee>
            </span>
            <p className="description"> ${props.details.Description}</p>
        </div>
    )
}

export default VideoCard;