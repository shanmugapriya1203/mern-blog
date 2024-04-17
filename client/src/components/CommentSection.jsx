import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
function CommentSection({postId}) {
    const {currentUser}= useSelector((state)=>state.user)
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
console.log(comments)
    useEffect(()=>{
      const getComments= async()=>{
        try {
          const res= await fetch(`/api/comment/getPostComments/${postId}`)
          if(res.ok){
            const data= await res.json()
            setComments(data)
          }
        } catch (error) {
          console.log(error.message)
        }
      }
      getComments()

    },[postId])


    const handleSubmit= async(e)=>{
e.preventDefault()
if(comment.length >200){
    return
}
try {
    const res= await fetch('/api/comment/create',{
  method:'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content:comment,
    postId,
    userId:currentUser._id
  })

    })
    const data= await res.json()
    if(res.ok){
      setComment('')
      setCommentError(null)
      setComments((prev)=>[...prev,data])
    }
} catch (error) {
  setCommentError(error.message);
}
    }
  return (
    <div>
        {
            currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
            <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
</div>

            ):(
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                You must be signed in to comment.
                <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                  Sign In
                </Link>
              </div>
            )
        }
      {
        currentUser && (
            <form onSubmit={handleSubmit}
            className='border border-teal-500 rounded-md p-3'>
                  <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
             <div className='flex justify-between items-center mt-5'>
             <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
             </div>
             {
                commentError && (
                    <Alert color='failure' className='mt-5'>
                        {commentError}
                    </Alert>
                )
             }
            </form>
        )
      }
    
    </div>
  )
}

export default CommentSection