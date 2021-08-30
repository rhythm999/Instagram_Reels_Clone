


let Preview=(props)=>{
    return (
        <div className="reel_card">
            <video className="reel_video" src={props.details.url}></video>

        </div>
    )
}
export default Preview;