import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput ,Spinner} from 'flowbite-react'; // Make sure you import these components correctly

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return setErrorMessage('Please fill all the fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.status !== 200) { // Check for a successful status code
        return setErrorMessage(data.message || 'Failed to sign in');
      }
      setLoading(false);
      navigate('/'); // Navigate only if the status code is 200
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
        {/* Left */}
        <div className='flex-1 pb-5'>
          <Link to='/' className='font-bold dark:text-white text-4xl '>
            <span className='px-2 py-1  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>ByteBlogs</span>
          </Link>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         
            <div className=''>
              <Label value='Your email' />
              <TextInput type='email' placeholder='name@email.com' id='email' onChange={handleChange} />
            </div>
            <div className=''>
              <Label value='Your password' />
              <TextInput type='password' placeholder='**********' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToBlue' disabled={loading} type="submit">
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className=''>
            <span>Dont Have an account ?</span>
            <Link to='/sign-up'>
              <Button gradientDuoTone='purpleToBlue' disabled={loading}>
                Sign Up
              </Button>
            </Link>
          </div>
          {errorMessage && (
            <Alert className=' mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
