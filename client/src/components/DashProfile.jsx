

import { Button, TextInput, Alert } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from './../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileError, setImageFileError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const FilePickRef = useRef();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + (imageFile.name || 'unnamed');
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadingProgress(progress.toFixed(0));
        }, (error) => {
            setImageFileError('Could not upload image (File must be less than 2MB)');
            setImageFileUploadingProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
                setFormData({ ...formData, profilePicture: downloadURL });
                setImageFileUploading(false);
            });
        });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
          setUpdateUserError('No changes made');
          return;
        }
        if (imageFileUploading) {
          setUpdateUserError('Please wait for the image to upload');
          return;
        }
        try {
          dispatch(updateStart());
         const token= localStorage.getItem("token")// Set the token in localStorage
          const headers = {
            'Content-Type': 'application/json',
        
          };
          if(token){
            headers['Authorization'] = token
          }
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
          } else {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User's profile updated successfully");
          }
        } catch (error) {
          dispatch(updateFailure(error.message));
          setUpdateUserError(error.message);
        }
      };
      
      
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={FilePickRef} hidden />
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => FilePickRef.current.click()}>
                    {
                        imageFileUploadingProgress !== null && (
                            <CircularProgressbar
                                value={imageFileUploadingProgress || 0}
                                text={`${imageFileUploadingProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    },
                                    path: {
                                        stroke: imageFileUploadingProgress < 50
                                            ? `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`
                                            : `rgba(28, 200, 138, ${imageFileUploadingProgress / 100})`
                                    },
                                    text: {
                                        fill: '#333'
                                    }
                                }}
                            />
                        )
                    }
                    <img src={imageFileUrl || currentUser.profilePicture} alt='user' className='rounded-full w-full h-full  object-cover border-8 border-[lightgray]' />
                </div>
                <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='******' onChange={handleChange} />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
            {
                updateUserSuccess && (
                    <Alert className=' mt-5' color='success'>
                        {updateUserSuccess}
                    </Alert>
                )
            }
            {
                updateUserError && (
                    <Alert className=' mt-5' color='failure'>
                        {updateUserError}
                    </Alert>
                )
            }
        </div>
    );
}

export default DashProfile;
