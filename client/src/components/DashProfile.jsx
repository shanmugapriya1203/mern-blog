import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from './../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
    const [imageFileError, setImageFileError] = useState(null)
const [formData, setFormData] = useState({})
    const FilePickRef = useRef()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = async () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + (imageFile.name || 'unnamed');
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadingProgress(progress.toFixed(0))
        }, (error) => {
            setImageFileError('Could not upload image (File must be less than 2MB)')
            setImageFileUploadingProgress(null)
            setImageFile(null)
            setImageFileUrl(null)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL)
                setFormData({...formData,profilePicture:downloadURL})
            })
        })
    }
   

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={FilePickRef} hidden />
                <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => FilePickRef.current.click()}>
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
            ? `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})` // Change color for progress below 50%
            : `rgba(28, 200, 138, ${imageFileUploadingProgress / 100})` // Change color for progress above or equal to 50%
        },
        text: { // Adjust text color if needed
          fill: '#333' // Change to your preferred text color
        }
      }}
    />
  )
}

                    <img src={imageFileUrl || currentUser.profilePicture} alt='user' className='rounded-full w-full h-full  object-cover border-8 border-[lightgray]' />
                </div>
                <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email}  />
                <TextInput type='password' id='password' placeholder='******' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile
