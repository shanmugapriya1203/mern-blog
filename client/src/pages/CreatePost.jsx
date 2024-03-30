import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getStorage, ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { app } from './../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
    const[file,setFile]=useState(null)
    const[imageUploadProgress,setImageUploadProgress]=useState(null)
    const [imageUploadError, setImageUploadError] = useState(null);
     const[formData,setFormData]=useState({})
    const handleUploadImage=async()=>{
 try {
    if(!file){
        setImageUploadError('Please provide a file')
        return;
    }
    setImageUploadError(null);
    const storage= getStorage(app)
    const fileName= new Date().getTime()+'-'+ file.name
    const storageRef= ref(storage,fileName)
    const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on(
        'state_changed',
        (snapshot)=>{
            const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            console.log(progress)
            setImageUploadProgress(progress.toFixed(0))
        },
        (error)=>{
            setImageUploadError('Failed to upload', error)
            setImageUploadError(null);

        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setImageUploadError(null);
                setImageUploadProgress(null);
                setFormData({...formData,image:downloadURL});
             
            })
        }
       
    )
 } catch (error) {
    setImageUploadError('Image upload failed');
      setImageUploadProgress(null);

    console.log(error)
 }
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput
                type='text'
                placeholder='Title ' required
                id='title' className='flex-1'
/>
<Select>
    <option value='Select Category'>Select Category</option>
    <option value='Tech'>Tech</option>
    <option value='Politics'>Politics</option>
    <option value='Entertainment'>Entertainment</option>
</Select>
            </div>
            <div className='flex gap-4 items-center justify-between bottom-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue'size='sm' outline
                onClick={handleUploadImage} disabled={imageUploadProgress}
                > {
                    imageUploadProgress ?
                    <div className='w-16 h-16'>
                        <CircularProgressbar
                            value={imageUploadProgress || 0}
                            text={`${imageUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                },
                                trail: {
                                    color: '#eee',
                                    opacity: 1,
                                    strokeWidth: 1,
                                },
                                path: {
                                    color: '#000',
                                    transition: 'none',
                                    stroke: '#000',
                                    strokeWidth: '10',
                                    fill: 'none',
                                },
                                text: {
                                    color: '#000',
                                    fontSize: '12px',
                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                    fontWeight: 'bold',
                                    fill: '#000',
                                },
                            }}
                        />
                    </div>
                    :
                    'Upload Image'
                }
                </Button>
            </div>
            {
                imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
            }
            {
                formData.image && (
                    <img src={formData.image}
                    alt='upload'
                    className='Write Something'
                    />
                )
            }
            <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12' required/>
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
     
    </div>
  )
}

export default CreatePost
