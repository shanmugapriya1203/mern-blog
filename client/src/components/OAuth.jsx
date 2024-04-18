import React from 'react';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      if (!resultFromGoogle || resultFromGoogle?.user === null) {
        throw new Error('The authentication popup was canceled by the user.');
      }

      const { displayName, email, photoURL } = resultFromGoogle.user;

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: displayName,
          email,
          photoURL
        })
      });

      if (!res.ok) {
        throw new Error('Failed to authenticate with Google');
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Error during Google authentication:', error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <Button type='button' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-8 h-8 mr-2 text-red-600' />
      </Button>
    </div>
  );
};

export default OAuth;
