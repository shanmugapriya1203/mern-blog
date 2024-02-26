import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
const DashProfile = () => {
    const { currentUser}= useSelector((state)=>state.user)
    const[imageFile,setImageFie]=useState(null)
    const[imageFileUrl,setImageFileUrl]=useState(null)
    const FilePickRef=useRef()
    const handleImageChange=(e)=>{
      const file= e.target.files[0]
      if(file){
        setImageFie(file)
        setImageFileUrl(URL.createObjectURL(file))

      }

    }
    useEffect(()=>{
      if(imageFile){
        uploadImage()
      }
    },[imageFile])
    const handleImage=async()=>{
      console.log('Uploading image')
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={FilePickRef} hidden />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>FilePickRef.current.click()}>
        <img src={ imageFileUrl || currentUser.profilePicture} alt='user' className='rounded-full w-full h-full  object-coverborder-8 border-[lightgray]'/>
        </div>
<TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}/>
<TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email}/>
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
