import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import {  useDispatch,useSelector } from 'react-redux';
const OAuth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
    const auth=getAuth(app)
    const handleGoogleClick = async()=>{
        
        const provider= new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultFromGoogle= await signInWithPopup(auth,provider)
           const res= await fetch('/api/auth/google',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:resultFromGoogle.user.displayName,
              email:resultFromGoogle.user.email,
              photoURL:resultFromGoogle.user.photoURL,
              
            })
           })
           const data=await res.json()
        if(res.status === 200) {
          dispatch(signInSuccess(data))
          navigate('/')
        }
       
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
      <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
<AiFillGoogleCircle className='w-6 h-6 mr-2'/>
  

Continue with google
      </Button>
    </div>
  )
}

export default OAuth



