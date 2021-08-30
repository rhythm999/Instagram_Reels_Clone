
import { useContext, useState } from 'react';
import { storage, firestore } from '../firebase';
import './Css/Upload.css'

import { AuthContext } from "./AuthProvider"
import { Link, Redirect } from 'react-router-dom';

let Upload = () => {

    let value = useContext(AuthContext);
    let DescriptionVid;
    let songName;

   let [uploading,setUploadind]=useState(false);
   let [temp,setTemp]=useState(0);
   let [total,setTotal]=useState(0);

    return (
        temp==total && total>0?(<Redirect to="/home"></Redirect>):
        (<div className="upload_container">
            <div className="upload_modal">
                <form class="p-4">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter Description</label>
                        <input class="form-control" id="exampleInputEmail1" placeholder=" Enter Video Description" onChange={(e) => {
                            DescriptionVid = (e.currentTarget.value);
                        }} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Enter Song Name</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="Enter your Song Name" onChange={(e) => {
                            songName = (e.currentTarget.value);
                        }} />
                    </div>
                    { uploading?
                    
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    :""}
                    <input type="file"
                        onChange={(e) => {
                            let file = e.target.files[0];
                            let objfile = {
                                Name: Date.now() + file.name,
                                Size: file.size / 1000000,
                                Type: file.type.split("/")[0],
                                Descriptoin: DescriptionVid,
                                Songname: songName,
                            }
                            let f1 = (snapshot) => {
                                setTemp(snapshot.bytesTransferred);
                                setTotal(snapshot.totalBytes);
                            }
                            let f2 = (error) => {
                                console.log(error);
                            }
                            let f3 = () => {
                                let p = uploadtask.snapshot.ref.getDownloadURL();
                                p.then((url) => {
                                    firestore.collection("posts").add({
                                        username: value.displayName,
                                        uid:value.uid,
                                        Description: DescriptionVid,
                                        song: songName,
                                        url: url,
                                        likes: 0,
                                        comments: [],
                                    })
                                })
                            }
                            let uploadtask = storage.ref(`/posts/${value.uid}/${objfile.Name}`).put(file);

                            uploadtask.on("state_changed", f1, f2, f3);
                            setUploadind(true);
                        }}></input>                    
                </form>
                <img className="uploadPoster" src="https://cdn.pixabay.com/photo/2017/01/31/17/08/arms-2025624_960_720.png"></img>
                <img className="uploadPosterr" src="https://cdn.pixabay.com/photo/2020/01/31/07/53/man-4807395_960_720.jpg"></img>
            </div>
        </div>)
    )
}

export default Upload;