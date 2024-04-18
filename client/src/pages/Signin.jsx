import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import Cookies from 'js-cookie';

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.status === 200) {
        const token = data.access_token;
        localStorage.setItem('token', token);
        dispatch(signInSuccess(data));
        navigate('/dashboard'); // Redirect to dashboard after successful sign-in
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure('An error occurred while signing in'));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
    
        <div className='flex-1 pb-10'>
          <h2 className='text-3xl font-bold dark:text-white'>Sign In</h2>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <Label value='Your email' />
                <TextInput type='email' placeholder='name@email.com' id='email' onChange={handleChange} />
              </div>
            </div>

            <div className=''>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>

            <Button gradientDuoTone='purpleToBlue' disabled={loading} type='submit'>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <hr className='my-4' />
            <p className='text-center'>OR</p>

            {/* OAuth */}
            <OAuth/>
          </form>

          <div className='mt-4'>
            <span>Don't have an account?</span>
            <Link to='/sign-up'>
              <Button gradientDuoTone='purpleToBlue' disabled={loading}>
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Error message */}
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
