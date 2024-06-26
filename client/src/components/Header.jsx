import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun } from "react-icons/fa";
import {  useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { toggleTheme } from '../redux/theme/themeSlice';
const Header = () => {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const path=useLocation().pathname
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {theme}= useSelector((state)=>state.theme)
  const handleSignout = async () => {
    try {
        const res = await fetch('/api/user/signout', {
            method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
            console.log('Error:', data.message); // Log error message if request fails
        } else {
            console.log('Sign-out successful:', data); // Log success message if sign-out is successful
            dispatch(signoutSuccess(data));
            // Ensure that 'navigate' function is defined and imported properly
             navigate('/');
        }
    } catch (error) {
        console.error('Error:', error); // Log any unexpected errors
    }
}
  return (
    <Navbar className='border-b-2'>
     <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
  <div style={{ fontFamily: "'Roboto', sans-serif", backgroundImage: 'linear-gradient(to right, purple, blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
    Byte&nbsp;Blog
  </div>
</Link>
        <form>
          <TextInput type='text' placeholder='Search...'  rightIcon={AiOutlineSearch}  className='hidden lg:inline' />
          </form>
          <Button className='w-12 h-10 lg:hidden' color='gray'>
            <AiOutlineSearch/>
          </Button>
<div className='flex gap-2 md:order-2' >
  <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
   {
    theme === 'dark'? <FaSun/> : <FaMoon/>
   }
  </Button>
  {
  currentUser ? (
<Dropdown arrowIcon={false}
inline
label={
  <Avatar
  alt='user'
  img={currentUser.profilePicture}
  rounded
  />
}
>
  <Dropdown.Header>
    <span className='block text-sm'> @ {currentUser.username}</span>
  </Dropdown.Header>
  <Link to={'/dashboard?tab=profile'}>
    <Dropdown.Item>Profile</Dropdown.Item>
  
  </Link>
  <Dropdown.Divider/>
  <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
</Dropdown>
  ) : (
   
    <Link to='/sign-in'>
      <Button gradientDuoTone='purpleToBlue'>
        Sign In
      </Button>
    </Link>
  )
}



  <Navbar.Toggle/>

  </div> 
  <Navbar.Collapse>
    <Navbar.Link  active={path ==="/"} as={'div'}>
      <Link to='/'>
        Home
      </Link>
    </Navbar.Link>
    <Navbar.Link active={path ==='/about'}as={'div'} >
      <Link to='/about'>
        About
      </Link>
    </Navbar.Link>
    <Navbar.Link active={path ==='/projects'} as={'div'}>
      <Link to='/projects'>
        Projects
      </Link>
    </Navbar.Link>  
    <Navbar.Link active={path ==='create-post'} as={'div'}>
      <Link to='/create-post'>
        Write
      </Link>
    </Navbar.Link>    
  </Navbar.Collapse>  
    </Navbar>
  )
}

export default Header
