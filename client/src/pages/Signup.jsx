import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>ByteBlogs</span>
          </Link>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className=''>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username' />
            </div>
            <div className=''>
              <Label value='Your email' />
              <TextInput type='text' placeholder='name@email.com' id='email' />
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput type='text' placeholder='Password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign up
            </Button>
          </form>
          <div className=''>
            <span>Have an account ?</span>
            <Link to='/sign-in'>
              <Button gradientDuoTone='purpleToBlue'>
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
