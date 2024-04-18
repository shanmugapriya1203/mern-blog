import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput ,Spinner} from 'flowbite-react'; // Make sure you import these components correctly
import OAuth from '../components/OAuth';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage('Please fill all the fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!data.success) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
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
    <h2 className='text-3xl font-bold dark:text-white'>Create Account</h2>
    </div>

    <div className='flex-1'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex gap-4'>
          <div className='flex-1'>
            <Label value='Your username' />
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
          </div>
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
            'Get Started'
          )}
        </Button>

        <hr className='my-4' />
        <p className='text-center'>OR</p>
        
        {/* OAuth */}
        <OAuth/>
      </form>

      <div className='mt-4'>
        <span>Have an account?</span>
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' disabled={loading}>
            Sign In
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
  )
};

export default Signup;
