
import { useContext, useState } from 'react';
import { storage, firestore } from './firebase';
import './Upload.css'

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
                            console.log(objfile);
                            let f1 = (snapshot) => {
                                console.log(snapshot.bytesTransferred);
                                console.log(snapshot.totalBytes);
                                setTemp(snapshot.bytesTransferred);
                                setTotal(snapshot.totalBytes);
                            }
                            let f2 = (error) => {
                                console.log(error);
                            }
                            let f3 = () => {
                                let p = uploadtask.snapshot.ref.getDownloadURL();
                                console.log(p)
                                p.then((url) => {
                                    console.log({
                                        username: value.displayName,
                                        Description: DescriptionVid,
                                        song: songName,
                                        url: url,
                                        likes: 0,
                                        comments: [],
                                    })
                                    firestore.collection("posts").add({
                                        username: value.displayName,
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
            </div>
        </div>)
    )
}

export default Upload;