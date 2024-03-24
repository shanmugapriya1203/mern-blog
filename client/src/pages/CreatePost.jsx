import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
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
                <FileInput type='file' accept='image/*'/>
                <Button type='button' gradientDuoTone='purpleToBlue'size='sm' outlin> Upload Image</Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12' required/>
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
     
    </div>
  )
}

export default CreatePost
